import type { RefObject } from 'react'
import { useEffect } from 'react'

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: Function,
) => {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node | null)) {
        return
      }
      callback()
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [ref, callback])
}
