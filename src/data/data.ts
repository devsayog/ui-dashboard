import { AiFillAppstore, AiFillHome, AiOutlineMobile } from 'react-icons/ai'
import {
  BsFillCalendarCheckFill,
  BsPeopleFill,
  BsTabletLandscape,
} from 'react-icons/bs'
import { FaClipboard, FaUserSecret } from 'react-icons/fa'
import { GrCycle } from 'react-icons/gr'
import { ImCart } from 'react-icons/im'
import { IoIosPeople } from 'react-icons/io'
import { MdCategory, MdLaptopMac, MdOutlineAttachMoney } from 'react-icons/md'
import { SiSalesforce } from 'react-icons/si'

import { getRandomNumber } from '@/utils/getRandomNumber'

const labels = [
  // 'Jan',
  // 'Feb',
  // 'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  // 'Oct',
  // 'Nov',
  // 'Dec',
]
export const customersByAgeGroup = {
  label: 'Customers by age group (percentage)',
  datasets: [
    {
      data: [10, 15, 25, 30, 10],
      backgroundColor: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'],
      borderColor: '#0f172a',
      // hoverBorderColor: '#0f172a',
      borderWidth: 1,
    },
  ],
  labels: ['Age 14-18', 'Age 18-24', 'Age 24-34', 'Age 34-50', 'Age 50+'],
}
export const salesByCategory = {
  datasets: [
    {
      data: [100, 300, 50, 74, 76],
      backgroundColor: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'],
      borderWidth: 7,
      borderColor: '#0f172a',
      hoverBorderColor: '#0f172a',
    },
  ],
  labels: ['Shoes', 'Clothing', 'Mobile', 'Laptops', 'Books'],
}
export const stackedBarData = {
  labels,
  datasets: [
    {
      label: 'Budget',
      data: labels.map(() => getRandomNumber(0, 200)),
      backgroundColor: '#047857',
    },
    {
      label: 'Expenses',
      data: labels.map(() => getRandomNumber(0, 200)),
      backgroundColor: '#c2410c',
    },
  ],
}
export const lineChartData = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: labels.map(() => getRandomNumber(0, 250)),
      backgroundColor: '#a21caf',
      borderColor: '#a21caf',
      tension: 0.08,
    },
    {
      label: 'Orders',
      data: labels.map(() => getRandomNumber(0, 250)),
      borderColor: '#4d7c0f',
      backgroundColor: '#4d7c0f',
    },
  ],
}

export const devicesLabels = [
  {
    title: 'Desktop',
    value: 18,
    Icon: MdLaptopMac,
    color: '#047857',
  },
  {
    title: 'Tablet',
    value: 12,
    Icon: BsTabletLandscape,
    color: '#1d4ed8',
  },
  {
    title: 'Mobile',
    value: 70,
    Icon: AiOutlineMobile,
    color: '#a21caf',
  },
]
export const trafficByDevices = {
  datasets: [
    {
      data: [18, 12, 70],
      backgroundColor: ['#047857', '#1d4ed8', '#a21caf'],
      borderWidth: 7,
      borderColor: '#0f172a',
      hoverBorderColor: '#0f172a',
    },
  ],
  labels: ['Desktop', 'Tablet', 'Mobile'],
}

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
