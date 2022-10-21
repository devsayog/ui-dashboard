import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input, SumbitBtn } from '@/components/common/FormsElem'
import { useAppStore } from '@/hooks/useAppStore'

import type { CardType } from '../types'

const schema = z.object({
  title: z.string().trim().min(3, 'title must be 3 characters long'),
  content: z.string().trim(),
})
type CardSchemaType = z.infer<typeof schema>
const CardInfo = ({
  card,
  closeModal,
}: {
  card: CardType
  closeModal?: VoidFunction
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CardSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { ...card },
  })
  const boardStore = useAppStore()
  const removeCard = () => {
    boardStore.removeCardFromBoard({ cardId: card.id, listId: card.listId })
  }
  return (
    <form
      aria-busy={isSubmitting}
      onSubmit={handleSubmit((values) => {
        boardStore.updateCard({ ...card, ...values })
        closeModal?.()
      })}
    >
      <fieldset className="disabled:opacity-50" disabled={isSubmitting}>
        <Input
          {...register('title')}
          error={errors.title}
          label="title"
          placeholder="Enter title"
          type="text"
        />
        <label className="my-2 block font-medium capitalize" htmlFor="content">
          Description
        </label>
        <textarea
          {...register('content')}
          rows={5}
          aria-invalid={errors.content ? true : undefined}
          aria-describedby="content-error"
          className="w-full rounded-md border-gray-500 bg-gray-700/10 py-1.5 px-2 text-gray-300 disabled:opacity-40"
          id="content"
        />
        {errors.content && (
          <p
            role="alert"
            id="content-error"
            className="mt-1 text-sm tracking-wide text-red-400"
          >
            {errors.content.message}
          </p>
        )}
        <div className="mt-4">
          <SumbitBtn text="Update Card" />
          <button
            type="button"
            className="focus ml-2 rounded-md bg-red-500 py-2 px-4 capitalize text-white transition hover:bg-red-700"
            onClick={removeCard}
          >
            Delete Card
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default CardInfo
