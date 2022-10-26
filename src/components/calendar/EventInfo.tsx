import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { z } from 'zod'

import { useAppStore } from '@/hooks/useAppStore'

import { Input, TextArea } from '../common/FormsElem'
import type { EventType } from './types'

const schema = z.object({
  title: z.string().trim().min(3, 'Title must be 3 characters long'),
  description: z.string().trim(),
})

type EventInfoType = z.infer<typeof schema>
interface IEventInfoProps {
  date: Date
  closeModal: () => void
  event: EventType | null
}
const EventInfo = ({ date, closeModal, event }: IEventInfoProps) => {
  const calendarStore = useAppStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventInfoType>({
    resolver: zodResolver(schema),
    defaultValues: { ...event },
  })

  const handleFormUpload: SubmitHandler<EventInfoType> = async (data) => {
    if (event) {
      calendarStore.updateEvent({ ...event, ...data })
    } else {
      calendarStore.addEvent({
        date: format(date, 'MMMM-dd-yyyy'),
        ...data,
      })
    }
    closeModal()
  }
  return (
    <form aria-busy={isSubmitting} onSubmit={handleSubmit(handleFormUpload)}>
      <fieldset disabled={isSubmitting} className="disabled:opacity-50">
        <div className="flex items-center gap-4 text-gray-600">
          <AiOutlineFieldTime aria-hidden="true" className="text-xl" />{' '}
          <time dateTime={format(date, 'MMMM-dd-yyyy')}>
            {format(date, 'MMMM-dd-yyyy')}
          </time>
        </div>
        <Input
          {...register('title')}
          error={errors.title}
          label="Title"
          placeholder="Enter event title"
          type="text"
          light
        />
        <TextArea
          {...register('description')}
          error={errors.description}
          label="Description"
          placeholder="Enter event description"
          light
        />
        <div className="mt-4">
          <button
            type="submit"
            className="calendarModal__btn bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"
          >
            {!event ? 'Add' : 'Save'} event
          </button>
          {event && (
            <button
              type="submit"
              className="calendarModal__btn ml-2 bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500"
              onClick={() =>
                calendarStore.deleteEvent({
                  date: event.date,
                  id: event.id,
                })
              }
            >
              Delete event
            </button>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default EventInfo
