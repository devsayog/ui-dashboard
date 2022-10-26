import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input, SumbitBtn, TextArea } from '@/components/common/FormsElem'
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
        <TextArea
          {...register('content')}
          error={errors.content}
          label="Description"
          placeholder="Enter event details"
        />
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
