import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'

export const useImageUpload = () => {
  const [image, setImage] = useState<{ file: File | null; error: string }>({
    file: null,
    error: '',
  })
  const handleFileUpload = useMemo(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      if (!files) {
        return undefined
      }
      // Only care about first file
      const file = files[0]
      if (!file) {
        return undefined
      }
      const allowedExtensions = /(jpg|jpeg|png|gif|svg|webp)$/i
      const [type, ext = ''] = file.type.split('/')

      if (type !== 'image' && !allowedExtensions.exec(ext)) {
        return setImage({ file: null, error: 'Invalid file format' })
      }
      return setImage({
        error: '',
        file,
      })
    },
    [],
  )
  return { image, handleFileUpload, setImage }
}
