import type { HTMLProps } from 'react'
import React, { useEffect } from 'react'

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${className} cursor-pointer border-gray-400 bg-gray-600 focus:ring-pink-600`}
      {...rest}
    />
  )
}
export default IndeterminateCheckbox
