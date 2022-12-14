import Link from 'next/link'
import { AiFillCloseCircle } from 'react-icons/ai'
import { RiDashboard2Fill } from 'react-icons/ri'

import { navLinks } from '@/data/data'

interface ISidenavProps {
  drawer?: boolean
  close?: () => void
}
const Sidenav = ({ drawer, close }: ISidenavProps) => {
  return (
    <div className="fixed inset-y-0 left-0 h-full w-60 overflow-y-auto bg-slate-900">
      <div aria-label="sidebar" className="py-8 px-3">
        {drawer && (
          <div className="mb-2 flex justify-end">
            <button
              onClick={close}
              className="focus ml-1 rounded-full p-1 transition-transform hover:scale-105"
            >
              <AiFillCloseCircle
                className="rounded-full bg-slate-900 text-4xl text-red-300"
                aria-hidden="true"
              />
              <span className="sr-only">close drawer menu</span>
            </button>
          </div>
        )}
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
