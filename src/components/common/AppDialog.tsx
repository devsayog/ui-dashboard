import { Dialog, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useState,
} from 'react'
import { AiFillEdit, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

interface IAppDialogProps {
  title: string
  children: ReactNode
  edit?: boolean
}
const AppDialog = ({ title, children, edit }: IAppDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const mapped = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return null
    }
    if (typeof child.type === 'string') {
      return child
    }
    return cloneElement(child, {
      ...child.props,
      closeModal,
    })
  })
  return (
    <>
      <button
        className={`${
          edit ? 'rounded-full p-1' : 'rounded-md py-1.5 px-3'
        } focus bg-blue-600 text-gray-300 transition hover:scale-105 hover:text-gray-200`}
        onClick={openModal}
      >
        {edit ? (
          <>
            <AiFillEdit aria-hidden="true" className="text-2xl" />
            <p className="sr-only">Edit</p>
          </>
        ) : (
          <>
            <p className="flex items-center">
              Add
              <AiOutlinePlus aria-hidden="true" className="ml-1 text-xl" />
            </p>
          </>
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-75"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <Dialog.Panel className="w-full max-w-md divide-y divide-gray-700 overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="mb-2 text-lg font-medium leading-6 text-gray-300"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="focus -mt-2 grid h-8 w-8 place-content-center rounded-full bg-red-500/40 p-1 text-white transition hover:bg-red-500"
                    >
                      <AiOutlineClose className="h-6 w-6" />
                    </button>
                  </div>
                  {mapped}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AppDialog
