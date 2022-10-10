import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import type { IconType } from 'react-icons'
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'

import { deleteSelectedRows } from '@/utils/tableUtils'

import DebouncedInput from './DebouncedInput'
import TableContainer from './TableContainer'

const PaginationButton = ({
  icon: Icon,
  click,
  disabled,
  ariaText,
}: {
  icon: IconType
  click: () => void
  disabled: boolean
  ariaText: string
}) => (
  <button
    className="focus rounded bg-slate-800 p-1 transition-all hover:scale-105 hover:text-gray-200 disabled:opacity-50"
    type="button"
    onClick={click}
    disabled={disabled}
  >
    <p className="sr-only">{ariaText}</p>
    <Icon aria-hidden="true" className="text-2xl" />
  </button>
)
type AppTableProps<T> = {
  columns: ColumnDef<T, any>[]
  displayData: T[]
  hideDeleteBtn?: boolean
}
const AppTable = <T,>({
  columns,
  displayData,
  hideDeleteBtn,
}: AppTableProps<T>) => {
  const [data, setData] = useState<T[]>(displayData)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const {
    getHeaderGroups,
    getRowModel,
    getSelectedRowModel,
    setPageIndex,
    getCanPreviousPage,
    previousPage,
    nextPage,
    getCanNextPage,
    getState,
    getPageCount,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <TableContainer>
      <div className="flex justify-between px-3 py-1">
        <div className="flex">
          {!hideDeleteBtn && (
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
          )}
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
                <th key={header.id} className="p-3">
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
                            <p className="sr-only">Sorted by ascending order</p>
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
                <td key={cell.id} className="px-3 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {getPageCount() > 1 && (
        <div className="my-4 flex items-center justify-center gap-2">
          <PaginationButton
            ariaText="go to first page"
            icon={CgPlayTrackPrev}
            click={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          />
          <PaginationButton
            ariaText="go to previous page"
            icon={MdOutlineNavigateBefore}
            click={() => previousPage()}
            disabled={!getCanPreviousPage()}
          />
          <p className="text-sm">
            Page{' '}
            <span className="text-base font-bold">
              {getState().pagination.pageIndex + 1}
            </span>{' '}
            of <span className="text-base font-bold">{getPageCount()}</span>
          </p>
          <PaginationButton
            ariaText="go to next page"
            icon={MdOutlineNavigateNext}
            click={() => nextPage()}
            disabled={!getCanNextPage()}
          />
          <PaginationButton
            ariaText="go to last page"
            icon={CgPlayTrackNext}
            click={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          />
        </div>
      )}
    </TableContainer>
  )
}

export default AppTable
