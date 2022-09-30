import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai'

import DebouncedInput from '@/components/common/DebouncedInput'
import IndeterminateCheckbox from '@/components/common/IndeterminateCheckbox'
import TableContainer from '@/components/common/TableContainer'
import { categoriesData } from '@/data/data'
import { deleteSelectedRows } from '@/utils/tableUtils'

type Category = {
  title: string
  image: string
}

const Categories = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [data, setData] = useState(categoriesData)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

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
        cell: () => <button className="px-3 py-1">Edit</button>,
      },
    ],
    [],
  )

  const { getHeaderGroups, getRowModel, getSelectedRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <section className="section" aria-labelledby="page-title">
      <div className="mx-auto max-w-md">
        <h2 className="heading2 mb-4" id="page-title">
          Categories
        </h2>
        <TableContainer>
          <div className="flex justify-between px-3 py-1">
            <div className="flex">
              <button
                disabled={!getSelectedRowModel().rows.length}
                className="focus flex h-9 w-9 items-center justify-center rounded-full p-1 transition hover:bg-red-200 disabled:opacity-60"
                onClick={() =>
                  deleteSelectedRows({
                    rowSelection,
                    data,
                    setData,
                    setRowSelection,
                  })
                }
              >
                <p className="sr-only">Delete Selected Rows</p>
                <AiFillDelete
                  aria-hidden="true"
                  className="text-2xl text-red-500"
                />
              </button>
            </div>
            <DebouncedInput
              debounce={400}
              value={(globalFilter ?? '') as string}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search"
            />
          </div>

          <table className="table">
            <thead className="table__head">
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="p-3" key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center space-x-2 ${
                            header.column.getCanSort() ? 'cursor-pointer' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <>
                                <AiOutlineArrowUp
                                  aria-hidden="true"
                                  className="text-lg text-green-400"
                                />
                                <p className="sr-only">
                                  Sorted by descending order
                                </p>
                              </>
                            ),
                            desc: (
                              <>
                                <AiOutlineArrowDown
                                  aria-hidden="true"
                                  className="text-lg text-red-400"
                                />
                                <p className="sr-only">
                                  Sorted by ascending order
                                </p>
                              </>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="table__body">
              {getRowModel().rows.map((row) => (
                <tr key={row.id} className="table__row-body">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap px-3 py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>
    </section>
  )
}

export default Categories
