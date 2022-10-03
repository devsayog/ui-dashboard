import type { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { forwardRef } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps {
  label: string
  type: HTMLInputTypeAttribute
  placeholder?: string
  error: FieldError | undefined
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, type, ...props },
  ref,
) {
  return (
    <>
      <label className="my-2 block font-medium capitalize" htmlFor={label}>
        {label}
      </label>
      <input
        aria-invalid={error?.message ? true : undefined}
        aria-describedby={`${label}-error`}
        className="w-full rounded-md border-gray-500 bg-gray-700/10 py-1.5 px-2 text-gray-300"
        id={label}
        type={type}
        ref={ref}
        {...props}
      />
      {error?.message && (
        <p
          role="alert"
          id={`${label}-error`}
          className="mt-1 text-sm tracking-wide text-red-400"
        >
          {error?.message}
        </p>
      )}
    </>
  )
})
export const FileInput = ({
  onChange,
  error,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error: string
}) => {
  return (
    <>
      <label
        htmlFor="image"
        className="my-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-blue-900 px-2 py-4 font-medium shadow-lg transition hover:bg-blue-800 hover:text-white"
      >
        <svg
          className="h-8 w-8"
          fill="tomato"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <p className="mt-2 text-center text-base leading-normal">
          Select a file
        </p>
      </label>
      <input
        aria-invalid={error ? true : undefined}
        aria-describedby={`file-error`}
        onChange={onChange}
        className="sr-only"
        type="file"
        id="image"
        name="image"
      />
      {error && (
        <p
          role="alert"
          id={`file-error`}
          className="mt-1 text-sm tracking-wide text-red-400"
        >
          {error}
        </p>
      )}
    </>
  )
}

export const SumbitBtn = ({ text }: { text: string }) => {
  return (
    <button
      className="focus rounded-md bg-purple-900 py-2  px-4 capitalize text-white transition hover:bg-purple-600"
      type="submit"
    >
      {text}
    </button>
  )
}
