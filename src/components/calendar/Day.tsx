import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { format } from 'date-fns'
import type { KeyboardEvent } from 'react'
import { Fragment, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

import { useAppStore } from '@/hooks/useAppStore'
import { useGetScreenSize } from '@/hooks/useGetScreenWidth'

import CalendarDialog from './CalendarDialog'
import EventInfo from './EventInfo'
import type { EventType } from './types'

const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
  if (e.key !== 'Enter') {
    return
  }
  e.stopPropagation()
}

const EventButton = ({
  ev,
  handleEdit,
}: {
  ev: EventType
  handleEdit: (data: EventType) => void
}) => {
  return (
    <button
      key={ev.id}
      className="mb-0.5 w-full flex-auto truncate bg-indigo-400 px-0.5 font-medium text-gray-700 transition hover:bg-indigo-600 hover:text-gray-100 md:text-sm"
      onClick={(e) => {
        handleEdit(ev)
        e.stopPropagation()
      }}
      onKeyDown={handleKeyDown}
    >
      {ev.title}
    </button>
  )
}

interface IDayProps {
  isCurrentMonth: boolean
  date: Date
  isToday: boolean
}
const Day = ({ isCurrentMonth, date, isToday }: IDayProps) => {
  const calendarStore = useAppStore()
  const screenSize = useGetScreenSize(768)

  const eventList = calendarStore.eventById[format(date, 'MMMM-dd-yyyy')]

  const [addEvent, setAddEvent] = useState(false)
  // Used For Editing Event, Pass selected event to EventInfo Component
  const [event, setEvent] = useState<EventType | null>(null)
  const [openEventList, setOpenEventList] = useState(false)
  const handleCloseModal = () => {
    setAddEvent(false)
    setEvent(null)
  }
  const handleEdit = (params: EventType) => {
    setEvent(params)
    setAddEvent(true)
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
        {eventList && eventList.events.length > 0 && (
          <>
            {!screenSize ? (
              <ol className="mt-1 leading-5">
                {calendarStore.eventById[format(date, 'MMMM-dd-yyyy')]?.events
                  .slice(0, 2)
                  .map((evnt) => (
                    <li key={evnt.id} className="text-xs">
                      <EventButton ev={evnt} handleEdit={handleEdit} />
                    </li>
                  ))}
                {eventList.events.length > 2 && (
                  <li>
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={`w-full text-left text-xs font-medium text-indigo-600 transition hover:text-indigo-900 ${
                              open ? '' : 'opacity-90'
                            }`}
                          >
                            + {eventList.events.length - 2} more
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-0"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-0"
                          >
                            <Popover.Panel className="absolute  z-10 mt-2 w-full">
                              <div className="space-y-0.5 overflow-hidden bg-slate-200 py-1 text-xs shadow-xl ring-1 ring-black/5">
                                {eventList.events.slice(2).map((ev) => (
                                  <EventButton
                                    key={ev.id}
                                    ev={ev}
                                    handleEdit={handleEdit}
                                  />
                                ))}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </li>
                )}
              </ol>
            ) : (
              <>
                <button
                  className="focus"
                  onClick={(e) => {
                    setOpenEventList(true)
                    e.stopPropagation()
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <BiDotsHorizontalRounded
                    aria-hidden="true"
                    className="text-2xl text-indigo-700"
                  />
                </button>
                <CalendarDialog
                  closeModal={() => setOpenEventList(false)}
                  isOpen={openEventList}
                >
                  <div className="space-y-2 p-1 text-base">
                    {eventList.events.map((ev) => (
                      <EventButton
                        key={ev.id}
                        ev={ev}
                        handleEdit={handleEdit}
                      />
                    ))}
                  </div>
                </CalendarDialog>
              </>
            )}
          </>
        )}
      </div>
      <CalendarDialog closeModal={handleCloseModal} isOpen={addEvent}>
        <EventInfo event={event} closeModal={handleCloseModal} date={date} />
      </CalendarDialog>
    </>
  )
}

export default Day
