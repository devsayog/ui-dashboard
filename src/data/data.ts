import { AiFillAppstore, AiFillHome } from 'react-icons/ai'
import { BsFillCalendarCheckFill, BsPeopleFill } from 'react-icons/bs'
import { FaClipboard, FaUserSecret } from 'react-icons/fa'
import { ImCart } from 'react-icons/im'
import { MdCategory } from 'react-icons/md'

export const navLinks = [
  {
    title: 'dashboard',
    links: [
      {
        name: 'overview',
        Icon: AiFillHome,
      },
    ],
  },
  {
    title: 'management',
    links: [
      {
        name: 'categories',
        Icon: AiFillAppstore,
      },
      {
        name: 'products',
        Icon: ImCart,
      },
      {
        name: 'orders',
        Icon: MdCategory,
      },
      {
        name: 'customers',
        Icon: BsPeopleFill,
      },
      {
        name: 'employees',
        Icon: FaUserSecret,
      },
    ],
  },
  {
    title: 'apps',
    links: [
      {
        name: 'kanban',
        Icon: FaClipboard,
      },
      {
        name: 'calendar',
        Icon: BsFillCalendarCheckFill,
      },
    ],
  },
  {
    title: 'management',
    links: [
      {
        name: 'categories',
        Icon: AiFillAppstore,
      },
      {
        name: 'products',
        Icon: ImCart,
      },
      {
        name: 'orders',
        Icon: MdCategory,
      },
      {
        name: 'customers',
        Icon: BsPeopleFill,
      },
      {
        name: 'employees',
        Icon: FaUserSecret,
      },
    ],
  },
]
