import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type SyntheticEvent,
  type WheelEvent,
} from 'react'
import SaveCompleteModal from '../Modal/SaveCompleteModal'
import './HistoryPhotoCropEditor.css'

const DEFAULT_CROP_WIDTH = 333
const DEFAULT_CROP_HEIGHT = 170
const MIN_ZOOM = 1
const MAX_ZOOM = 3

interface HistoryPhotoCropEditorProps {
  imageUrl: string
  imageName: string
  onSave: (blob: Blob) => void
}

function getOutputImageType(imageName: string) {
  const extension = imageName.split('.').pop()?.toLowerCase()

  if (extension === 'png') return 'image/png'
  if (extension === 'webp') return 'image/webp'
  return 'image/jpeg'
}

interface ImageSize {
  width: number
  height: number
}

function HistoryPhotoCropEditor({
  imageUrl,
  imageName,
  onSave,
}: HistoryPhotoCropEditorProps) {
  const dragRef = useRef({ isDragging: false, x: 0, y: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const pointersRef = useRef(new Map<number, { x: number; y: number }>())
  const pinchRef = useRef({ distance: 0, zoom: 1 })
  const [imageSize, setImageSize] = useState<ImageSize>()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedBlob, setCroppedBlob] = useState<Blob>()
  const [isSaveCompleteModalOpen, setIsSaveCompleteModalOpen] = useState(false)
  const [stageWidth, setStageWidth] = useState(393)
  const [cropSize, setCropSize] = useState({
    width: DEFAULT_CROP_WIDTH,
    height: DEFAULT_CROP_HEIGHT,
  })

  useEffect(() => {
    const stage = stageRef.current
    const viewport = viewportRef.current
    if (!stage || !viewport) return

    const updateSizes = () => {
      setStageWidth(stage.getBoundingClientRect().width)
      const viewportRect = viewport.getBoundingClientRect()
      setCropSize({ width: viewportRect.width, height: viewportRect.height })
    }

    updateSizes()
    const observer = new ResizeObserver(updateSizes)
    observer.observe(stage)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  const baseScale = imageSize
    ? Math.max(
        stageWidth / imageSize.width,
        cropSize.height / imageSize.height,
      )
    : 1
  const displayWidth = imageSize ? imageSize.width * baseScale * zoom : 0
  const displayHeight = imageSize ? imageSize.height * baseScale * zoom : 0

  const clampOffset = (x: number, y: number, nextZoom = zoom) => {
    if (!imageSize) return { x: 0, y: 0 }

    const scale = baseScale * nextZoom
    const maxX = Math.max(0, (imageSize.width * scale - cropSize.width) / 2)
    const maxY = Math.max(0, (imageSize.height * scale - cropSize.height) / 2)

    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    }
  }

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!imageSize) return
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    dragRef.current = { isDragging: true, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)

    if (pointersRef.current.size === 2) {
      const pointers = Array.from(pointersRef.current.values())
      const first = pointers[0]
      const second = pointers[1]
      if (!first || !second) return
      pinchRef.current = {
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        zoom,
      }
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const previousPointer = pointersRef.current.get(event.pointerId)
    if (!previousPointer) return

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size >= 2) {
      const pointers = Array.from(pointersRef.current.values())
      const first = pointers[0]
      const second = pointers[1]
      if (!first || !second) return
      const distance = Math.hypot(second.x - first.x, second.y - first.y)
      if (pinchRef.current.distance > 0) {
        const nextZoom = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, pinchRef.current.zoom * (distance / pinchRef.current.distance)),
        )
        setZoom(nextZoom)
        setOffset((current) => clampOffset(current.x, current.y, nextZoom))
      }
      return
    }

    const deltaX = event.clientX - previousPointer.x
    const deltaY = event.clientY - previousPointer.y
    dragRef.current = { isDragging: true, x: event.clientX, y: event.clientY }
    setOffset((current) => clampOffset(current.x + deltaX, current.y + deltaY))
  }

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId)
    const remainingPointer = Array.from(pointersRef.current.values())[0]
    if (remainingPointer) {
      dragRef.current = { isDragging: true, ...remainingPointer }
      return
    }
    dragRef.current.isDragging = false
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    const nextZoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, zoom - event.deltaY * 0.0015),
    )
    setZoom(nextZoom)
    setOffset((current) => clampOffset(current.x, current.y, nextZoom))
  }

  const createCroppedImage = async () => {
    if (!imageSize) return

    const sourceImage = new Image()
    sourceImage.src = imageUrl
    await sourceImage.decode()

    const scale = baseScale * zoom
    const imageLeft = cropSize.width / 2 - displayWidth / 2 + offset.x
    const imageTop = cropSize.height / 2 - displayHeight / 2 + offset.y
    const sourceX = -imageLeft / scale
    const sourceY = -imageTop / scale
    const sourceWidth = cropSize.width / scale
    const sourceHeight = cropSize.height / scale
    const canvas = document.createElement('canvas')
    canvas.width = 666
    canvas.height = 340

    const context = canvas.getContext('2d')
    if (!context) return

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
      sourceImage,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    )

    const outputType = getOutputImageType(imageName)
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputType, outputType === 'image/png' ? undefined : 0.92),
    )
    if (!blob) return

    setCroppedBlob(blob)
    setIsSaveCompleteModalOpen(true)
  }

  const handleCloseSaveModal = () => {
    setIsSaveCompleteModalOpen(false)
    if (croppedBlob) onSave(croppedBlob)
  }

  return (
    <section
      className="history-photo-crop-editor"
      role="dialog"
      aria-modal="true"
      aria-label={`${imageName} 사진 편집`}
    >
      <div
        ref={stageRef}
        className="history-photo-crop-editor__stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onWheel={handleWheel}
      >
        <img
          className="history-photo-crop-editor__backdrop"
          src={imageUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
        <img
          className="history-photo-crop-editor__image history-photo-crop-editor__image--dimmed"
          src={imageUrl}
          alt="편집할 사진"
          draggable={false}
          onLoad={handleImageLoad}
          style={{
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
            transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
          }}
        />
        <div ref={viewportRef} className="history-photo-crop-editor__viewport">
          <img
            className="history-photo-crop-editor__image"
            src={imageUrl}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              width: `${displayWidth}px`,
              height: `${displayHeight}px`,
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
            }}
          />
        </div>
        <p className="history-photo-crop-editor__guide">화면을 움직여 조정</p>
        <div
          className="history-photo-crop-editor__frame"
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        className="history-photo-crop-editor__save-button"
        onClick={createCroppedImage}
        disabled={!imageSize}
      >
        저장하기
      </button>

      {isSaveCompleteModalOpen && (
        <SaveCompleteModal
          title="저장 완료되었습니다"
          onClose={handleCloseSaveModal}
        />
      )}
    </section>
  )
}

export default HistoryPhotoCropEditor
export type { HistoryPhotoCropEditorProps }
