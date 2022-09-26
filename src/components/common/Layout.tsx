import type { ReactNode } from 'react'

import Appbar from './Appbar'
import Sidebar from './Sidebar'

interface ILayoutProps {
  children: ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Appbar />
      {/* <div className="grid w-full grid-cols-[auto,1fr]"> */}
      <div className="lg:grid lg:grid-cols-[auto,minmax(0,1fr)]">
        <Sidebar />
        <main className="mt-14 w-full">{children}</main>
      </div>
    </div>
  )
}

export default Layout
