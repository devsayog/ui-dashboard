import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { categories } from '@/data/data'
import { useImageUpload } from '@/hooks/useImageUpload'
import { formUpload } from '@/utils/uploadForm'

import { FileInput, Input, SelectInput, SumbitBtn } from '../common/FormsElem'
import ImagePreview from '../common/ImagePreview'

const schema = z.object({
  title: z.string().trim().min(3, 'Title must be 3 characters long'),
  price: z.number().min(1, 'Price must be greater than 0'),
  category: z
    .string({ invalid_type_error: 'Please select category' })
    .refine((val) => categories.map((category) => category === val)),
})

type ProductSchemaType = z.infer<typeof schema>

const ProductForm = ({
  initialState,
  closeModal,
  edit,
}: {
  initialState?: ProductSchemaType & { image: string }
  edit?: boolean
  closeModal?: VoidFunction
}) => {
  const { image, handleFileUpload, setImage } = useImageUpload()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialState },
  })
  const handleFormUpload: SubmitHandler<ProductSchemaType> = async (data) => {
    await formUpload<ProductSchemaType>({
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
          label="Title"
          placeholder="Enter product name"
          type="text"
        />
        <Input
          {...register('price', { valueAsNumber: true })}
          error={errors.price}
          label="Price in USD"
          placeholder="Enter price"
          type="number"
          step="0.01"
        />
        <SelectInput
          {...register('category')}
          error={errors.category}
          label="Select category"
          options={categories}
        />
        <FileInput error={image.error} onChange={handleFileUpload} />
        <ImagePreview file={image.file} image={initialState?.image || ''} />
        <SumbitBtn text={`${edit ? 'Edit' : 'Create new product'}`} />
      </fieldset>
    </form>
  )
}
export default ProductForm
