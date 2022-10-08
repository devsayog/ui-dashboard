import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'

import AppDialog from '@/components/common/AppDialog'
import AppTable from '@/components/common/AppTable'
import IndeterminateCheckbox from '@/components/common/IndeterminateCheckbox'
import ProductForm from '@/components/products/ProductForm'
import { productsData } from '@/data/data'

type Product = {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
}

const Products = () => {
  const columns = useMemo<ColumnDef<Product, any>[]>(
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
        header: 'Title',
        accessorKey: 'title',
        accessorFn: (row) => row.title,
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
            <span className="w-[60ch]">{info.getValue()}</span>
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
        accessorFn: (row) => row.category,
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
      {
        header: 'Price',
        accessorFn: (row) => String(row.price),
        accessorKey: 'price',
        cell: (props) => (
          <span className="whitespace-nowrap">{props.getValue()}</span>
        ),
      },
      {
        header: 'Action',
        cell: (props) => (
          <AppDialog edit title="Edit">
            <ProductForm edit initialState={props.row.original} />
          </AppDialog>
        ),
      },
    ],
    [],
  )
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h2 className="heading2 mb-4" id="page-title">
            Products
          </h2>
          <AppDialog title="Add new Product">
            <ProductForm />
          </AppDialog>
        </div>
        <AppTable columns={columns} displayData={productsData} />
      </div>
    </section>
  )
}

export default Products
