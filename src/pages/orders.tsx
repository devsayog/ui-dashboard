import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import AppDialog from '@/components/common/AppDialog'
import AppTable from '@/components/common/AppTable'
import Order from '@/components/orders'
import { ordersData } from '@/data/data'

type OrderType = {
  id: string
  name: string
  totalPrice: number
  customer: {
    name: string
    address: string
  }
  status: string
  date: string
  products: {
    image: string
    title: string
    price: number
    qty: number
  }[]
}
const getBgColor = (status: string) => {
  let str = ''
  switch (status.toLowerCase()) {
    case 'pending':
      str = 'bg-blue-700'
      break
    case 'complete':
      str = 'bg-teal-700'
      break
    case 'canceled':
      str = 'bg-orange-700'
      break
    case 'rejected':
      str = 'bg-red-700'
      break

    default:
      break
  }
  return str
}
const Orders = () => {
  const columns = useMemo<ColumnDef<OrderType, any>[]>(
    () => [
      {
        header: 'Title',
        accessorKey: 'name',
        accessorFn: (row) => row.name,
        cell: (info) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="rounded-3xl bg-slate-700 py-1 px-3 text-center text-xl capitalize">
              <p>{info.row.original.date.split(' ')[1]}</p>
              <p>{info.row.original.date.split(' ')[2]}</p>
            </div>
            <div className="text-lg uppercase">
              <p className="paragraph">{info.getValue()}</p>
              <p className="paragraph font-medium">
                $ {info.row.original.totalPrice}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        accessorFn: (row) => row.status,
        cell: (props) => (
          <span
            className={`whitespace-nowrap rounded-2xl py-1.5 px-3 text-base uppercase ${getBgColor(
              props.getValue(),
            )}`}
          >
            {props.getValue()}
          </span>
        ),
      },
      {
        header: 'Details',
        cell: (props) => (
          <AppDialog order edit title="Order Details">
            <Order order={props.row.original} />
          </AppDialog>
        ),
      },
    ],
    [],
  )
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="mx-auto max-w-xl">
        <h2 className="heading2 mb-4" id="page-title">
          Orders
        </h2>
        <AppTable hideDeleteBtn columns={columns} displayData={ordersData} />
      </div>
    </section>
  )
}

export default Orders
