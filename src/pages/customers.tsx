import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'

import AppTable from '@/components/common/AppTable'
import IndeterminateCheckbox from '@/components/common/IndeterminateCheckbox'
import { customers } from '@/data/data'

type Customer = {
  address: string
  email: string
  image: string
  name: string
  phone: string
  registered: string
}

const Customers = () => {
  const columns = useMemo<ColumnDef<Customer, any>[]>(
    () => [
      {
        id: 'Select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
        accessorFn: (row) => row.name,
        cell: (info) => (
          <div className="flex items-center space-x-1">
            <Image
              src={info.row.original.image}
              alt={info.getValue()}
              layout="fixed"
              width="50"
              height="50"
              className="rounded-full"
            />
            <span className="whitespace-nowrap">{info.getValue()}</span>
          </div>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        accessorFn: (row) => row.email,
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
      {
        header: 'Address',
        accessorFn: (row) => row.address,
        accessorKey: 'address',
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
      {
        header: 'Phone',
        accessorFn: (row) => row.phone,
        accessorKey: 'phone',
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
      {
        header: 'Registration date',
        accessorFn: (row) => row.registered.slice(0, 10),
        accessorKey: 'registered',
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
    ],
    [],
  )
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="mx-auto max-w-full">
        <h2 className="heading2 mb-4" id="page-title">
          Products
        </h2>
        <AppTable columns={columns} displayData={customers} />
      </div>
    </section>
  )
}

export default Customers
