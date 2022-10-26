import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { v4 } from 'uuid'

import Day from './Day'

const Calendar = () => {
  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date())
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  }).map((day) => ({
    isCurrentMonth: isSameMonth(day, firstDayCurrentMonth),
    date: day,
    isToday: isToday(day),
  }))
  const prevMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }
  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

  return (
    <div>
      <div className="border-b border-gray-300 bg-white p-2 text-gray-600">
        <div className="flex items-center">
          <button
            className="rounded-full p-1 transition hover:bg-gray-300"
            type="button"
            onClick={prevMonth}
          >
            <span className="sr-only">previous month</span>
            <BsChevronLeft className="text-xl" />
          </button>
          <p className="w-36 text-center font-semibold">{currentMonth}</p>
          <button
            className="rounded-full p-1 transition hover:bg-gray-300"
            type="button"
            onClick={nextMonth}
          >
            <span className="sr-only">next month</span>
            <BsChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      <div className="shadow ring-1 ring-white/10">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="grid w-full grid-flow-row grid-cols-7 gap-px">
            {days.map((day) => (
              <Day {...day} key={v4()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
