import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input, SelectInput, SumbitBtn } from '../common/FormsElem'

const statuses = ['rejected', 'complete', 'canceled', 'pending']
const schema = z.object({
  id: z.string().trim().min(3, 'Title must be 3 characters long'),
  name: z.string().trim().min(3, 'Title must be 3 characters long'),
  'customer.name': z.string().trim().min(3, 'Title must be 3 characters long'),
  'customer.address': z
    .string()
    .trim()
    .min(3, 'Title must be 3 characters long'),
  totalPrice: z.number().min(1, 'Price must be greater than 0'),
  date: z.string().min(1, 'Price must be greater than 0'),
  status: z
    .string({ invalid_type_error: 'Please select valid status' })
    .refine((val) => statuses.map((status) => status === val)),
})

// eslint-disable-next-line @typescript-eslint/naming-convention
type orderSchema = z.infer<typeof schema>

const OrderForm = ({
  initialState,
  closeEditingState,
}: {
  initialState: orderSchema
  closeEditingState: VoidFunction
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<orderSchema>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialState },
  })
  const handleFormUpload: SubmitHandler<orderSchema> = () => {
    closeEditingState()
  }
  return (
    <form aria-busy={isSubmitting} onSubmit={handleSubmit(handleFormUpload)}>
      <fieldset disabled={isSubmitting} className="disabled:opacity-50">
        <Input
          {...register('id')}
          error={errors.id}
          label="Order Id"
          placeholder="Enter Order Id"
          type="text"
          disabled
        />
        <Input
          {...register('name')}
          error={errors.name}
          label="Title"
          placeholder="Enter product name"
          type="text"
          disabled
        />
        <Input
          {...register('customer.name')}
          error={errors['customer.name']}
          label="Title"
          placeholder="Enter product name"
          type="text"
          disabled
        />
        <Input
          {...register('customer.address')}
          error={errors['customer.address']}
          label="Address"
          placeholder="Enter address"
          type="text"
          disabled
        />
        <Input
          {...register('totalPrice', { valueAsNumber: true })}
          error={errors.totalPrice}
          label="Price in USD"
          placeholder="Enter price"
          type="number"
          step="0.01"
          disabled
        />
        <SelectInput
          {...register('status')}
          error={errors.status}
          label="Select Status"
          options={statuses}
        />
        <div className="my-2">
          <SumbitBtn text="Update Order" />
          <button
            type="button"
            className="focus ml-2 rounded-md bg-yellow-700 py-2 px-4 capitalize text-white transition hover:bg-yellow-600"
            onClick={closeEditingState}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  )
}
export default OrderForm
