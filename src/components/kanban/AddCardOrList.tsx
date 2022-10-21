import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppStore } from '@/hooks/useAppStore'
import { useFocus } from '@/hooks/useFocus'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { SumbitBtn } from '../common/FormsElem'

const schema = z.object({
  title: z.string().trim().min(3, 'title must be 3 characters long'),
})
type CType = z.infer<typeof schema>
const CreateCard = ({
  cancel,
  type,
  listId,
}: {
  cancel: VoidFunction
  type: 'card' | 'list'
  listId?: string
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CType>({
    resolver: zodResolver(schema),
  })
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useFocus()
  const { ref, ...rest } = register('title')
  useOutsideClick(formRef, cancel)
  const boardStore = useAppStore()
  const add = (values: CType) => {
    if (type === 'list') {
      return boardStore.addList(values.title)
    }
    if (!listId) return null
    return boardStore.addCard({ listId, ...values })
  }
  return (
    <form
      onKeyDown={(e) => {
        const { key } = e
        const keys = ['Escape']
        if (keys.indexOf(key) > -1) {
          cancel()
        }
      }}
      ref={formRef}
      aria-busy={isSubmitting}
      onSubmit={handleSubmit((values) => {
        add(values)
        cancel()
      })}
    >
      <fieldset className="disabled:opacity-50" disabled={isSubmitting}>
        <label className="mb-2 block font-medium capitalize" htmlFor="content">
          Title
        </label>
        <input
          {...rest}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby="content-error"
          className="w-full rounded-md border-gray-300 bg-gray-700 py-1.5 px-2 text-gray-200 disabled:opacity-40"
          id="content"
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
        />
        {errors.title && (
          <p
            role="alert"
            id="content-error"
            className="mt-1 text-sm tracking-wide text-red-400"
          >
            {errors.title.message}
          </p>
        )}
        <div className="mt-2">
          <SumbitBtn text="Add" />
          <button
            type="button"
            className="focus ml-2 rounded-md bg-gray-500 py-2 px-4 capitalize text-white transition hover:bg-gray-700"
            onClick={cancel}
          >
            cancel
          </button>
        </div>
      </fieldset>
    </form>
  )
}

const AddCardorList = ({
  type,
  listId,
}: {
  type: 'card' | 'list'
  listId?: string
}) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm ? (
        <CreateCard
          listId={listId}
          type={type}
          cancel={() => setShowForm(false)}
        />
      ) : (
        <button
          type="button"
          className="focus w-full rounded-md bg-gray-500 py-2 capitalize text-white transition hover:bg-gray-700"
          onClick={() => setShowForm(true)}
        >
          Add New {type}
        </button>
      )}
    </>
  )
}

export default AddCardorList
