import { useEffect, useState } from 'react'

export const useGetScreenSize = (size: number) => {
  const [isSmall, setIsSmall] = useState<boolean>()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    function resize() {
      if (window.innerWidth < size) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }
    window.addEventListener('resize', resize)
    resize()
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', resize)
  }, [size])
  return isSmall
}
