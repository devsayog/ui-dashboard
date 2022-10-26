import type { ReactNode } from 'react'

import { useGetScreenSize } from '@/hooks/useGetScreenWidth'

import Appbar from './Appbar'
import Sidebar from './Sidebar'

interface ILayoutProps {
  children: ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
  const isSm = useGetScreenSize(1024)
  return (
    <div>
      <Appbar />
      <div className="lg:grid lg:grid-cols-[auto,minmax(0,1fr)]">
        {!isSm && <Sidebar />}
        <main className="mt-14 w-full">{children}</main>
      </div>
    </div>
  )
}

export default Layout
