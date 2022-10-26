import classNames from 'classnames'
import { format } from 'date-fns'
import { useState } from 'react'

import CalendarDialog from './CalendarDialog'
import EventInfo from './EventInfo'
import type { EventType } from './types'

interface IDayProps {
  isCurrentMonth: boolean
  date: Date
  isToday: boolean
}
const Day = ({ isCurrentMonth, date, isToday }: IDayProps) => {
  const [addEvent, setAddEvent] = useState(false)
  // Used For Editing Event, Pass selected event to EventInfo Component
  const [event, setEvent] = useState<EventType | null>(null)
  const handleCloseModal = () => {
    setAddEvent(false)
    setEvent(null)
  }
  const handleBtnClick = () => {
    setAddEvent(true)
  }
  return (
    <>
      <div
        aria-roledescription="open add event modal"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          const { key } = e
          if (key === 'Enter') {
            setAddEvent(true)
          }
        }}
        onClick={handleBtnClick}
        className={classNames(
          isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
          'relative p-1 h-16 md:h-24',
        )}
      >
        <time
          dateTime={format(date, 'yyyy-MMMM-dd')}
          className={classNames(
            isToday ? 'bg-indigo-600  text-white' : undefined,
            'flex h-6 w-6 items-center justify-center rounded-full font-semibold transition',
          )}
        >
          {format(date, 'd')}
        </time>
      </div>
      <CalendarDialog closeModal={handleCloseModal} isOpen={addEvent}>
        <EventInfo event={event} closeModal={handleCloseModal} date={date} />
      </CalendarDialog>
    </>
  )
}

export default Day
