import { Menu } from '@headlessui/react'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdNotificationsActive } from 'react-icons/md'
import { v4 } from 'uuid'

import { notificationsData } from '@/data/data'
import { useGetScreenSize } from '@/hooks/useGetScreenWidth'

import AppMenu from './AppMenu'
import Drawer from './Drawer'

const ProfileList = () => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`inline-flex w-full items-center rounded-md p-2 text-base ${
            active ? 'bg-slate-800 text-gray-200' : ''
          }`}
        >
          Log out
        </button>
      )}
    </Menu.Item>
  )
}

const MenuList = () => {
  if (notificationsData.length <= 0) {
    return <p>No new notification</p>
  }
  return (
    <>
      {notificationsData.slice(0, 4).map((notification) => (
        <Menu.Item key={v4()}>
          {({ active }) => (
            <button
              className={`inline-flex w-full items-center gap-2 rounded-md border-b border-gray-800 p-2 text-base ${
                active ? 'bg-slate-800 text-gray-200' : ''
              }`}
            >
              <Image
                src={notification.image}
                alt={notification.message}
                layout="fixed"
                width="40"
                height="40"
                className="rounded-full"
              />
              <div className="flex flex-col items-center">
                <p className="text-sm">{notification.message}</p>
                <span className="text-sm">
                  {format(notification.time, 'MMM-dd')}
                </span>
              </div>
            </button>
          )}
        </Menu.Item>
      ))}
      <Menu.Item>
        {({ active }) => (
          <button
            type="button"
            className={`mt-1 w-full rounded bg-blue-100 py-1 px-3 text-blue-900 hover:bg-blue-700  ${
              active ? 'bg-slate-800 text-gray-200' : ''
            }`}
          >
            View All
          </button>
        )}
      </Menu.Item>
    </>
  )
}

const Appbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isSm = useGetScreenSize(1024)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-16 border-b border-b-gray-700 bg-slate-900">
        <nav className="flex h-full items-center justify-between px-6">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="focus rounded-full p-2 transition hover:bg-gray-700 lg:hidden"
          >
            <AiOutlineMenu className="text-2xl" aria-hidden="true" />
            <span className="sr-only">Open drawer menu</span>
          </button>
          <div className="flex items-center space-x-2 md:space-x-4 lg:ml-auto">
            <AppMenu
              right="-right-28"
              marginTop="mt-3"
              width="w-60"
              trigger={
                <div className="focus relative rounded-full p-2 transition hover:bg-gray-700">
                  <span className="sr-only">Notification</span>
                  <MdNotificationsActive
                    aria-hidden="true"
                    className="text-xl"
                  />
                  <span className="absolute -top-2 left-4 flex items-center rounded-full bg-green-800 p-1 text-xs text-gray-200">
                    22
                  </span>
                </div>
              }
            >
              <MenuList />
            </AppMenu>
            {/* TODO ADD DROPPABLE MENU */}
            <AppMenu
              right="-left-12"
              marginTop="mt-3"
              width="w-44"
              trigger={
                <div className="focus flex items-center space-x-2 overflow-hidden rounded-md p-1">
                  <span className="sr-only">profile</span>
                  <div className="h-7 w-7 rounded-full bg-gray-700 "></div>
                  <p className="text-sm md:text-base">John doe</p>
                </div>
              }
            >
              <ProfileList />
            </AppMenu>

            {/* TODO ADD DROPPABLE MENU */}
          </div>
        </nav>
      </div>
      {isSm && (
        <Drawer open={isDrawerOpen} handleChangeDrawer={setIsDrawerOpen} />
      )}
    </>
  )
}

export default Appbar
