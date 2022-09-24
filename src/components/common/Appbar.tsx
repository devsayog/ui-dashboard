import { AiOutlineMenu } from 'react-icons/ai'
import { MdNotificationsActive } from 'react-icons/md'

const Appbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-16 border-b border-gray-700 bg-slate-900">
      <nav className="flex h-full items-center justify-between px-6">
        <button className="focus rounded-full p-2 transition hover:bg-gray-700 lg:hidden">
          <AiOutlineMenu className="text-2xl" aria-hidden="true" />
          <span className="sr-only">Open Sidebar</span>
        </button>
        <div className="flex items-center space-x-2 md:space-x-4 lg:ml-auto">
          <button className="focus relative rounded-full p-2 transition hover:bg-gray-700">
            <span className="sr-only">Notification</span>
            <MdNotificationsActive aria-hidden="true" className="text-xl" />
            <span className="absolute -top-2 left-4 flex items-center rounded-full bg-green-800 p-1 text-xs text-gray-200">
              22
            </span>
          </button>
          {/* TODO ADD DROPPABLE MENU */}
          <button className="focus flex items-center space-x-2 overflow-hidden rounded-md p-1">
            <span className="sr-only">profile</span>
            <div className="h-7 w-7 rounded-full bg-gray-700 "></div>
            <p className="text-sm md:text-base">John doe</p>
          </button>
          {/* TODO ADD DROPPABLE MENU */}
        </div>
      </nav>
    </div>
  )
}

export default Appbar
