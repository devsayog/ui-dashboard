import Image from 'next/image'

const ImagePreview = ({
  file,
  image,
}: {
  file: File | null
  image: string
}) => {
  return (
    <div>
      {file && (
        <div>
          <p>Preview</p>
          <Image
            layout="fixed"
            width="100"
            height="100"
            src={URL.createObjectURL(file)}
            alt="Uploaded image"
          />
        </div>
      )}
      {!file && image && (
        <div>
          <p>Preview</p>
          <Image
            layout="fixed"
            width="100"
            height="100"
            src={image}
            alt="Current image"
          />
        </div>
      )}
    </div>
  )
}

export default ImagePreview
