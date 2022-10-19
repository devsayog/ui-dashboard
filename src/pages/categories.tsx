import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai'

import CategoryForm from '@/components/category/CategoryForm'
import AppDialog from '@/components/common/AppDialog'
import AppTable from '@/components/common/AppTable'
import IndeterminateCheckbox from '@/components/common/IndeterminateCheckbox'
import { categoriesData } from '@/data/data'

type Category = {
  title: string
  image: string
}

const Categories = () => {
  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        id: 'select',
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
        header: 'Image',
        accessorKey: 'image',
        enableSorting: false,
        cell: (props) => (
          <Image
            className="w-20 rounded-full"
            src={props.getValue() as string}
            alt={props.row.original.title}
            layout="fixed"
            width="50"
            height="50"
          />
        ),
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (props) => props.renderValue(),
      },
      {
        header: 'Action',
        cell: (props) => (
          <AppDialog
            edit
            title={`Edit:- ${props.row.original.title}`}
            trigger={
              <>
                <AiFillEdit aria-hidden="true" className="text-2xl" />
                <p className="sr-only">Edit {props.row.original.title}</p>
              </>
            }
          >
            <CategoryForm edit initialState={props.row.original} />
          </AppDialog>
        ),
      },
    ],
    [],
  )

  return (
    <section className="section" aria-labelledby="page-title">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <h2 className="heading2 mb-4" id="page-title">
            Categories
          </h2>
          <AppDialog
            title="Add new Category"
            trigger={
              <>
                <p className="flex items-center capitalize">
                  new Category
                  <AiOutlinePlus aria-hidden="true" className="ml-1 text-xl" />
                </p>
              </>
            }
          >
            <CategoryForm />
          </AppDialog>
        </div>
        <AppTable columns={columns} displayData={categoriesData} />
      </div>
    </section>
  )
}

export default Categories
