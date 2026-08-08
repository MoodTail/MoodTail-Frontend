import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react'
import {
  deleteHistoryPhoto,
  uploadHistoryPhoto,
} from '../../api/histories/histories.api'
import type {
  DailyHistoryPhoto,
  HistoryPhotoSourceType,
} from '../../api/histories/histories.types'
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
  photoId: number
  name: string
  url: string
  originalUrl: string
}

interface PhotoToCrop {
  id: string
  name: string
  url: string
  sourceType: HistoryPhotoSourceType
}

const MAX_PHOTO_COUNT = 5
const COLLAPSED_SHEET_OFFSET = 272

interface HistoryPhotoUploaderProps {
  collapsible?: boolean
  date: string
  initialPhotos?: DailyHistoryPhoto[]
}

interface HistoryPhotoUploaderHandle {
  collapseSheet: () => void
}

const HistoryPhotoUploader = forwardRef<
  HistoryPhotoUploaderHandle,
  HistoryPhotoUploaderProps
>(function HistoryPhotoUploader({
  collapsible = false,
  date,
  initialPhotos = [],
}, ref) {
  const [photos, setPhotos] = useState<PhotoPreview[]>([])
  const [cropQueue, setCropQueue] = useState<PhotoToCrop[]>([])
  const [editingPhoto, setEditingPhoto] = useState<PhotoPreview>()
  const [deletingPhoto, setDeletingPhoto] = useState<PhotoPreview>()
  const [modalTitle, setModalTitle] = useState<string>()
  const [isUploading, setIsUploading] = useState(false)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)
  const [isSheetInstantlyHidden, setIsSheetInstantlyHidden] = useState(false)
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

  useEffect(() => {
    setPhotos(
      initialPhotos.map((photo) => ({
        id: `server-${photo.photoId}`,
        photoId: photo.photoId,
        name: `사진 ${photo.photoId}`,
        url: photo.imageUrl,
        originalUrl: photo.imageUrl,
      })),
    )
  }, [initialPhotos])

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

  const appendPhotos = (
    event: ChangeEvent<HTMLInputElement>,
    sourceType: HistoryPhotoSourceType,
  ) => {
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
      sourceType,
    }))

    if (nextPhotosToCrop.length) {
      setCropQueue((current) => [...current, ...nextPhotosToCrop])
    }
    if (files.length > availableCount) {
      setModalTitle('사진은 최대 5장까지 저장 가능합니다')
    }
    event.target.value = ''
  }

  const handleCropSave = async (blob: Blob) => {
    const currentPhoto = cropQueue[0]
    if (!currentPhoto || isUploading) return

    try {
      setIsUploading(true)
      const image = new File([blob], currentPhoto.name, {
        type: blob.type || 'image/jpeg',
      })

      const uploadedPhoto = await uploadHistoryPhoto({
        date,
        image,
      })

      setIsSheetInstantlyHidden(true)
      setIsSheetExpanded(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsSheetInstantlyHidden(false))
      })
      setPhotos((current) => [
        ...current,
        {
          id: `${currentPhoto.id}-cropped`,
          photoId: uploadedPhoto.photoId,
          name: currentPhoto.name,
          url: URL.createObjectURL(blob),
          originalUrl: currentPhoto.url,
        },
      ])
      setCropQueue((current) => current.slice(1))
    } catch (error) {
      console.error(error)
      setModalTitle('사진 저장에 실패했습니다')
    } finally {
      setIsUploading(false)
    }
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

  const handleDeletePhoto = async () => {
    if (!deletingPhoto) return

    try {
      await deleteHistoryPhoto(date, deletingPhoto.photoId)
      if (deletingPhoto.url.startsWith('blob:')) {
        URL.revokeObjectURL(deletingPhoto.url)
      }
      if (deletingPhoto.originalUrl.startsWith('blob:')) {
        URL.revokeObjectURL(deletingPhoto.originalUrl)
      }
      setPhotos((current) =>
        current.filter((photo) => photo.id !== deletingPhoto.id),
      )
      setModalTitle('삭제되었습니다')
    } catch (error) {
      console.error(error)
      setModalTitle('사진을 삭제하지 못했습니다')
    } finally {
      setDeletingPhoto(undefined)
    }
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
        onClick={() => {
          if (!photos.length) setIsSheetExpanded(true)
        }}
      >
        {photos.length === 0 ? (
          <div className="history-photo-uploader__empty">
            <span aria-hidden="true">+</span>
            <strong>카메라로 찍기 또는 갤러리에서 불러오기</strong>
          </div>
        ) : (
          <>
          {photos.map((photo) => (
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
          ))}
          <button
            type="button"
            className="history-photo-uploader__add-more"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              setIsSheetExpanded(true)
            }}
          >
            <span aria-hidden="true">+</span>
            <strong>추가하기</strong>
          </button>
          </>
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          className={`history-photo-uploader__overlay${isSheetExpanded || sheetDragOffset !== undefined ? ' is-expanded' : ''}${sheetDragOffset !== undefined ? ' is-dragging' : ''}${isSheetInstantlyHidden ? ' is-instantly-hidden' : ''}`}
          style={{ background: `rgba(0, 0, 0, ${0.32 * sheetOpenProgress})` }}
          aria-label="사진 추가 바텀시트 접기"
          onClick={() => setIsSheetExpanded(false)}
        />
      )}

      <section
        className={`history-photo-uploader${collapsible ? ' history-photo-uploader--collapsible' : ''}${collapsible && !isSheetExpanded ? ' is-collapsed' : ''}${sheetDragOffset !== undefined ? ' is-dragging' : ''}${isSheetInstantlyHidden ? ' is-instantly-hidden' : ''}`}
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
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={(event) => appendPhotos(event, 'CAMERA')}
            />
          </label>

          <label className="history-photo-uploader__option">
            <img src={galleryIcon} alt="" />
            <span>
              <strong>갤러리에서 선택</strong>
              <small>사진을 불러올 수 있어요</small>
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => appendPhotos(event, 'GALLERY')}
            />
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
