import { Menu, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

interface IAppMenuProps {
  trigger: JSX.Element
  children: ReactNode
  right: string
  marginTop: string
  width: string
}
const AppMenu = ({
  trigger,
  children,
  right,
  marginTop,
  width,
}: IAppMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="focus inline-flex w-full justify-center rounded-md p-1 text-gray-300 hover:text-gray-200">
        {trigger}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <Menu.Items
          className={`${right} ${marginTop} ${width} absolute z-50 origin-top-right divide-y divide-gray-500 rounded-md bg-gray-900 shadow-lg ring-1 ring-white/10 focus:outline-none`}
        >
          <div className="p-1.5">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default AppMenu
