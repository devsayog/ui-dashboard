import { AiFillAppstore, AiFillHome } from 'react-icons/ai'
import { BsFillCalendarCheckFill, BsPeopleFill } from 'react-icons/bs'
import { FaClipboard, FaUserSecret } from 'react-icons/fa'
import { GrCycle } from 'react-icons/gr'
import { ImCart } from 'react-icons/im'
import { IoIosPeople } from 'react-icons/io'
import { MdCategory, MdOutlineAttachMoney } from 'react-icons/md'
import { SiSalesforce } from 'react-icons/si'

export const overviewCards = [
  {
    title: 'earnings',
    total: 39_999.01,
    Icon: MdOutlineAttachMoney,
    percentage: 10,
    text: '+10K this week',
    positive: true,
  },
  {
    title: 'total sales',
    total: 350_000,
    Icon: SiSalesforce,
    percentage: 20.9,
    text: '+16.4K this week',
    positive: true,
  },
  {
    title: 'visitors',
    total: 850_000,
    Icon: IoIosPeople,
    percentage: 8,
    text: '+2.5K this week',
    positive: true,
  },

  {
    title: 'total orders',
    total: 5_234,
    Icon: MdCategory,
    percentage: 3.2,
    text: '+5K this week',
    positive: true,
  },
  {
    title: 'products',
    total: 3_999,
    Icon: ImCart,
    percentage: 5,
    text: '+768 this week',
    positive: true,
  },
  {
    title: 'refunded',
    total: 520_123.99,
    Icon: GrCycle,
    percentage: 3.2,
    text: '+200 this week',
    positive: false,
  },
]

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
