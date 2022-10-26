import { Dialog, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FcMenu } from 'react-icons/fc'

interface ICalendarDialogProps {
  isOpen: boolean
  children: ReactNode
  closeModal: () => void
}
const CalendarDialog = ({
  isOpen,
  closeModal,
  children,
}: ICalendarDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <header className="flex justify-between py-1">
                  <FcMenu aria-hidden="true" />
                  <button
                    onClick={closeModal}
                    className="focus -mt-2 grid h-6 w-6 place-content-center rounded-full p-1 text-gray-400 transition hover:bg-red-500 hover:text-white"
                  >
                    <AiOutlineClose aria-hidden="true" className="h-6 w-6" />
                  </button>
                </header>
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CalendarDialog
