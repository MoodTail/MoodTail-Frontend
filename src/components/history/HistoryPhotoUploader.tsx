import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react'
import cameraIcon from '../../assets/icons/camera.svg'
import galleryIcon from '../../assets/icons/gallery.svg'
import photoEditIcon from '../../assets/icons/photo_edit.svg'
import photoDeleteIcon from '../../assets/icons/photo_delete.svg'
import SaveCompleteModal from '../Modal/SaveCompleteModal'
import TwoButtonModal from '../common/modal/TwoButtonModal'
import HistoryPhotoCropEditor from './HistoryPhotoCropEditor'
import HistoryPrimaryButton from './HistoryPrimaryButton'
import './HistoryPhotoUploader.css'

interface PhotoPreview {
  id: string
  name: string
  url: string
  originalUrl: string
}

interface PhotoToCrop {
  id: string
  name: string
  url: string
}

const MAX_PHOTO_COUNT = 5
const COLLAPSED_SHEET_OFFSET = 272

interface HistoryPhotoUploaderProps {
  collapsible?: boolean
}

interface HistoryPhotoUploaderHandle {
  collapseSheet: () => void
}

const HistoryPhotoUploader = forwardRef<
  HistoryPhotoUploaderHandle,
  HistoryPhotoUploaderProps
>(function HistoryPhotoUploader({ collapsible = false }, ref) {
  const [photos, setPhotos] = useState<PhotoPreview[]>([])
  const [cropQueue, setCropQueue] = useState<PhotoToCrop[]>([])
  const [editingPhoto, setEditingPhoto] = useState<PhotoPreview>()
  const [deletingPhoto, setDeletingPhoto] = useState<PhotoPreview>()
  const [modalTitle, setModalTitle] = useState<string>()
  const [isSheetExpanded, setIsSheetExpanded] = useState(true)
  const [sheetDragOffset, setSheetDragOffset] = useState<number>()
  const previewsRef = useRef<PhotoPreview[]>([])
  const cropQueueRef = useRef<PhotoToCrop[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDragging: false, startY: 0, scrollTop: 0 })
  const sheetDragState = useRef({
    isDragging: false,
    startY: 0,
    startOffset: 0,
    currentOffset: 0,
    toggleOnTap: false,
  })

  useEffect(() => {
    previewsRef.current = photos
  }, [photos])

  useEffect(() => {
    cropQueueRef.current = cropQueue
  }, [cropQueue])

  useImperativeHandle(ref, () => ({
    collapseSheet: () => {
      setIsSheetExpanded(false)
      setSheetDragOffset(undefined)
    },
  }), [])

  useEffect(
    () => () => {
      previewsRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.url)
        URL.revokeObjectURL(photo.originalUrl)
      })
      cropQueueRef.current.forEach((photo) => URL.revokeObjectURL(photo.url))
    },
    [],
  )

  const appendPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    const availableCount = Math.max(
      0,
      MAX_PHOTO_COUNT - photos.length - cropQueue.length,
    )
    const acceptedFiles = files.slice(0, availableCount)
    const nextPhotosToCrop = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    if (nextPhotosToCrop.length) {
      setCropQueue((current) => [...current, ...nextPhotosToCrop])
    }
    if (files.length > availableCount) {
      setModalTitle('사진은 최대 5장까지 저장 가능합니다')
    }
    event.target.value = ''
  }

  const handleCropSave = (blob: Blob) => {
    const currentPhoto = cropQueue[0]
    if (!currentPhoto) return

    setPhotos((current) => [
      ...current,
      {
        id: `${currentPhoto.id}-cropped`,
        name: currentPhoto.name,
        url: URL.createObjectURL(blob),
        originalUrl: currentPhoto.url,
      },
    ])
    setCropQueue((current) => current.slice(1))
  }

  const handleEditCropSave = (blob: Blob) => {
    if (!editingPhoto) return

    const nextUrl = URL.createObjectURL(blob)
    setPhotos((current) =>
      current.map((photo) =>
        photo.id === editingPhoto.id ? { ...photo, url: nextUrl } : photo,
      ),
    )
    URL.revokeObjectURL(editingPhoto.url)
    setEditingPhoto(undefined)
  }

  const handleDeletePhoto = () => {
    if (!deletingPhoto) return

    URL.revokeObjectURL(deletingPhoto.url)
    URL.revokeObjectURL(deletingPhoto.originalUrl)
    setPhotos((current) =>
      current.filter((photo) => photo.id !== deletingPhoto.id),
    )
    setDeletingPhoto(undefined)
    setModalTitle('삭제되었습니다')
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !listRef.current) return
    dragState.current = {
      isDragging: true,
      startY: event.clientY,
      scrollTop: listRef.current.scrollTop,
    }
    listRef.current.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging || !listRef.current) return
    listRef.current.scrollTop =
      dragState.current.scrollTop - (event.clientY - dragState.current.startY)
  }

  const stopDragging = () => {
    dragState.current.isDragging = false
  }

  const handleSheetPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary) return
    const startOffset = isSheetExpanded ? 0 : COLLAPSED_SHEET_OFFSET
    sheetDragState.current = {
      isDragging: true,
      startY: event.clientY,
      startOffset,
      currentOffset: startOffset,
      toggleOnTap:
        event.target instanceof Element &&
        Boolean(event.target.closest('.history-photo-uploader__handle')),
    }
    setSheetDragOffset(startOffset)
  }

  const handleSheetPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!sheetDragState.current.isDragging) return

    const nextOffset = Math.min(
      COLLAPSED_SHEET_OFFSET,
      Math.max(
        0,
        sheetDragState.current.startOffset +
          event.clientY -
          sheetDragState.current.startY,
      ),
    )
    sheetDragState.current.currentOffset = nextOffset
    setSheetDragOffset(nextOffset)
  }

  const handleSheetPointerUp = () => {
    if (!sheetDragState.current.isDragging) return

    const distance = Math.abs(
      sheetDragState.current.currentOffset - sheetDragState.current.startOffset,
    )
    const shouldExpand =
      distance < 4
        ? sheetDragState.current.toggleOnTap
          ? !isSheetExpanded
          : isSheetExpanded
        : sheetDragState.current.currentOffset < COLLAPSED_SHEET_OFFSET / 2

    sheetDragState.current.isDragging = false
    setIsSheetExpanded(shouldExpand)
    setSheetDragOffset(undefined)
  }

  const handleSheetPointerCancel = () => {
    sheetDragState.current.isDragging = false
    setSheetDragOffset(undefined)
  }

  const sheetOpenProgress =
    sheetDragOffset === undefined
      ? isSheetExpanded
        ? 1
        : 0
      : 1 - sheetDragOffset / COLLAPSED_SHEET_OFFSET

  return (
    <>
      <div
        ref={listRef}
        className={`history-photo-uploader__preview-list${photos.length ? ' has-photos' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        {photos.length === 0 ? (
          <p className="history-photo-uploader__empty">여기에 사진이 추가됩니다</p>
        ) : (
          photos.map((photo) => (
            <article key={photo.id} className="history-photo-uploader__preview-card">
              <img
                className="history-photo-uploader__preview"
                src={photo.url}
                alt={`선택한 사진: ${photo.name}`}
                draggable={false}
              />
              <div className="history-photo-uploader__preview-actions">
                <button
                  type="button"
                  aria-label={`${photo.name} 사진 수정`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    setEditingPhoto(photo)
                  }}
                >
                  <img src={photoEditIcon} alt="" />
                </button>
                <button
                  type="button"
                  aria-label={`${photo.name} 사진 삭제`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    setDeletingPhoto(photo)
                  }}
                >
                  <img src={photoDeleteIcon} alt="" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          className={`history-photo-uploader__overlay${isSheetExpanded || sheetDragOffset !== undefined ? ' is-expanded' : ''}${sheetDragOffset !== undefined ? ' is-dragging' : ''}`}
          style={{ background: `rgba(0, 0, 0, ${0.32 * sheetOpenProgress})` }}
          aria-label="사진 추가 바텀시트 접기"
          onClick={() => setIsSheetExpanded(false)}
        />
      )}

      <section
        className={`history-photo-uploader${collapsible ? ' history-photo-uploader--collapsible' : ''}${collapsible && !isSheetExpanded ? ' is-collapsed' : ''}${sheetDragOffset !== undefined ? ' is-dragging' : ''}`}
        style={sheetDragOffset === undefined ? undefined : { transform: `translateY(${sheetDragOffset}px)` }}
        aria-label="사진 추가"
        onPointerDown={collapsible ? handleSheetPointerDown : undefined}
        onPointerMove={collapsible ? handleSheetPointerMove : undefined}
        onPointerUp={collapsible ? handleSheetPointerUp : undefined}
        onPointerCancel={collapsible ? handleSheetPointerCancel : undefined}
      >
        {collapsible ? (
          <button
            type="button"
            className="history-photo-uploader__handle"
            aria-label={isSheetExpanded ? '사진 추가 바텀시트 접기' : '사진 추가 바텀시트 펼치기'}
            aria-expanded={isSheetExpanded}
          />
        ) : (
          <div className="history-photo-uploader__handle" aria-hidden="true" />
        )}
        <div className="history-photo-uploader__options">
          <label className="history-photo-uploader__option">
            <img src={cameraIcon} alt="" />
            <span>
              <strong>카메라로 찍기</strong>
              <small>바로 촬영이 가능해요</small>
            </span>
            <input type="file" accept="image/*" capture="environment" onChange={appendPhotos} />
          </label>

          <label className="history-photo-uploader__option">
            <img src={galleryIcon} alt="" />
            <span>
              <strong>갤러리에서 선택</strong>
              <small>사진을 불러올 수 있어요</small>
            </span>
            <input type="file" accept="image/*" multiple onChange={appendPhotos} />
          </label>
        </div>

        {!collapsible && (
          <HistoryPrimaryButton className="history-photo-uploader__save-button">
            사진 추가 및 상세 보기
          </HistoryPrimaryButton>
        )}
      </section>

      <TwoButtonModal
        isOpen={Boolean(deletingPhoto)}
        title="사진을 삭제하시겠어요?"
        description="삭제된 사진은 복구가 어렵습니다"
        leftButton={{
          label: '닫기',
          variant: 'secondary',
          onClick: () => setDeletingPhoto(undefined),
        }}
        rightButton={{
          label: '삭제하기',
          variant: 'primary',
          onClick: handleDeletePhoto,
        }}
        onOverlayClick={() => setDeletingPhoto(undefined)}
      />

      {modalTitle && (
        <SaveCompleteModal
          title={modalTitle}
          titleLines={
            modalTitle === '사진은 최대 5장까지 저장 가능합니다'
              ? ['사진은 최대 5장까지', '저장 가능합니다']
              : undefined
          }
          onClose={() => setModalTitle(undefined)}
        />
      )}

      {editingPhoto && (
        <HistoryPhotoCropEditor
          key={`edit-${editingPhoto.id}`}
          imageUrl={editingPhoto.originalUrl}
          imageName={editingPhoto.name}
          onSave={handleEditCropSave}
        />
      )}

      {!editingPhoto && cropQueue[0] && (
        <HistoryPhotoCropEditor
          key={cropQueue[0].id}
          imageUrl={cropQueue[0].url}
          imageName={cropQueue[0].name}
          onSave={handleCropSave}
        />
      )}
    </>
  )
})

export default HistoryPhotoUploader
export type { HistoryPhotoUploaderHandle, HistoryPhotoUploaderProps }
