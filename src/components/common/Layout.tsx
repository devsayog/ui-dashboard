import type { ReactNode } from 'react'

import Appbar from './Appbar'
import Sidebar from './Sidebar'

interface ILayoutProps {
  children: ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <main className="mt-14 w-full">{children}</main>
      </div>
    </>
  )
}

export default Layout
