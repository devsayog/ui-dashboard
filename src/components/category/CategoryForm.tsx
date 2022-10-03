import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useImageUpload } from '@/hooks/useImageUpload'
import { formUpload } from '@/utils/uploadForm'

import { FileInput, Input, SumbitBtn } from '../common/FormsElem'
import ImagePreview from '../common/ImagePreview'

const schema = z.object({
  title: z.string().trim().min(3, 'Title must be 3 characters long'),
})
export type CategorySchemaType = z.infer<typeof schema>

const CategoryForm = ({
  closeModal,
  initialState,
  edit,
}: {
  closeModal?: VoidFunction
  initialState?: CategorySchemaType & { image: string }
  edit?: boolean
}) => {
  const { image, handleFileUpload, setImage } = useImageUpload()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialState },
  })
  const handleFormUpload: SubmitHandler<CategorySchemaType> = async (data) => {
    await formUpload<CategorySchemaType>({
      data,
      closeModal,
      image,
      initialState,
      setImage,
    })
  }

  return (
    <form aria-busy={isSubmitting} onSubmit={handleSubmit(handleFormUpload)}>
      <fieldset disabled={isSubmitting} className="disabled:opacity-50">
        <Input
          {...register('title')}
          error={errors.title}
          label="category"
          placeholder="Enter category name"
          type="text"
        />
        <FileInput error={image.error} onChange={handleFileUpload} />
        <ImagePreview file={image.file} image={initialState?.image || ''} />
        <SumbitBtn text={`${edit ? 'Edit' : 'Create new category'}`} />
      </fieldset>
    </form>
  )
}

export default CategoryForm
