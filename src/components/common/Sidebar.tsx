import Sidenav from './Sidenav'

const Sidebar = () => {
  return (
    <div className="relative z-50 border-r border-gray-700">
      <div className="sticky top-0 hidden h-screen w-60 bg-slate-900 lg:block">
        <Sidenav />
      </div>
    </div>
  )
}

export default Sidebar
