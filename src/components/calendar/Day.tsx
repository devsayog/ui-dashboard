import classNames from 'classnames'
import { format } from 'date-fns'

interface IDayProps {
  isCurrentMonth: boolean
  date: Date
  isToday: boolean
}
const Day = ({ isCurrentMonth, date, isToday }: IDayProps) => {
  return (
    <>
      <div
        aria-roledescription="open add event modal"
        role="button"
        tabIndex={0}
        key={date.toString()}
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
    </>
  )
}

export default Day
