import type { Dispatch } from 'react'
import toast from 'react-hot-toast'

type ImageType = {
  file: File | null
  error: string
}
type FormUploadTypes<T> = {
  data: T
  image: ImageType
  initialState?: T & { image: string }
  closeModal: VoidFunction | undefined
  setImage: Dispatch<React.SetStateAction<ImageType>>
}
export const formUpload = async <T>({
  data,
  image,
  initialState,
  closeModal,
  setImage,
}: FormUploadTypes<T>) => {
  if (!image.file && !initialState?.image) {
    return setImage({ ...image, error: 'Please Upload image' })
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
      toast.success(
        initialState ? 'Successfully Edited' : 'Successfully added new item',
      )
      closeModal?.()
    }, 4000)
  })
}
