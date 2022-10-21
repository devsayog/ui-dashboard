import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import { useEffect, useState } from 'react'

interface IEditableProps {
  text: string
  placeholder: string
  children: ReactNode
  childRef: RefObject<HTMLInputElement>
  handleSubmit: () => void
}
const Editable = ({
  text,
  handleSubmit,
  children,
  childRef,
  ...props
}: IEditableProps) => {
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    if (isEditing && childRef && childRef.current) {
      childRef.current.focus()
    }
  }, [childRef, isEditing])
  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e
    const keys = ['Escape', 'Tab']
    if (key === 'Enter') {
      handleSubmit()
      setIsEditing(false)
    } else if (keys.indexOf(key) > -1) {
      setIsEditing(false)
    }
  }
  return (
    <div className="mr-2 h-8 w-full" {...props}>
      {isEditing ? (
        <div onBlur={() => setIsEditing(false)} onKeyDown={handleKeyDown}>
          {children}
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <h2 className="h-8 overflow-hidden text-lg font-medium">{text}</h2>
        </div>
      )}
    </div>
  )
}

export default Editable
