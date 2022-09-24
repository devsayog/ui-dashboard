import Link from 'next/link'
import { RiDashboard2Fill } from 'react-icons/ri'

import { navLinks } from '@/data/data'

const Sidenav = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <div aria-label="sidebar" className="py-8 px-3">
        <Link href="/">
          <a className="sidebar_link">
            <RiDashboard2Fill
              className="text-3xl text-purple-700"
              aria-hidden="true"
            />{' '}
            <p className="text-lg lg:text-xl">eStore</p>
          </a>
        </Link>
        <hr aria-hidden="true" className="mt-2 border-gray-700" />
        <nav>
          {navLinks.map((item) => (
            <div key={item.title} className="space-y-3 pt-2">
              <p className="mt-4 text-xl font-light uppercase xl:text-2xl">
                {item.title}
              </p>
              <ul className="space-y-2">
                {item.links.map((link) => (
                  <li key={link.name} className="ml-4">
                    <Link
                      href={`${
                        link.name.toLowerCase() === 'overview'
                          ? '/'
                          : link.name.toLowerCase()
                      }`}
                    >
                      <a className="sidebar_link">
                        <link.Icon aria-hidden="true" className="text-2xl" />
                        <p className="text-sm font-medium capitalize md:text-base">
                          {link.name}
                        </p>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidenav
