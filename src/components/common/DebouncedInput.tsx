import { useEffect, useState } from 'react'

type DebouncedInputTypes = {
  value: string | number
  onChange: (v: string | number) => void
  debounce: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 400,
  ...props
}: DebouncedInputTypes) => {
  const [value, setValue] = useState(initialValue)
  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeOut)
  }, [debounce, onChange, value])
  return (
    <>
      <label htmlFor="input" className="sr-only">
        Search
      </label>
      <input
        id="input"
        value={value}
        {...props}
        className="border-b border-purple-600 bg-black/30 px-4 py-1.5 text-gray-300 drop-shadow-md transition placeholder:text-gray-400 focus:outline-none focus-visible:border-pink-500 focus-visible:bg-black/10 focus-visible:shadow-md"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  )
}

export default DebouncedInput
