import type { SortingState } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

import DoughnutChart from '@/components/charts/DoughnutChart'
import LineChart from '@/components/charts/LineChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import TableContainer from '@/components/common/TableContainer'
import OverviewCard from '@/components/dashboard/OverviewCard'
import {
  customersByAgeGroup,
  devicesLabels,
  lineChartData,
  overviewCards,
  salesByCategory,
  stackedBarData,
  topSellingProducts,
  trafficByDevices,
} from '@/data/data'
import { initializeChart } from '@/utils/initializeChart'

initializeChart()

type Product = {
  title: string
  price: number
  image: string
  sold: number
  category: string
}
const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('title', {
    header: 'Name',
    cell: (info) => (
      <figure className="flex items-center space-x-2">
        <Image
          className="rounded-full"
          alt={info.getValue()}
          src={info.row.original.image}
          layout="fixed"
          width="50"
          height="50"
        />
        <figcaption>{info.getValue()}</figcaption>
      </figure>
    ),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('sold', {
    header: 'Sold',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor((row) => row.price * row.sold, {
    header: 'Sales',
    cell: (info) => `$${info.getValue()}`,
  }),
]

const Home = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: topSellingProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <section aria-labelledby="page-title" className="section">
      <h1 id="page-title" className="heading1 pt-4 lg:pt-0">
        Welcome back, John
      </h1>
      <p className="paragraph text-gray-500">
        Here&apos;s current status of your eStore.
      </p>
      <div className="spacing grid gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {overviewCards.map((cardData) => (
          <OverviewCard {...cardData} key={cardData.title} />
        ))}
      </div>
      <div className="space-y-4 md:space-y-8 xl:space-y-12">
        {/* Line chart */}
        <div className="chart-wrapper h-96 pb-12">
          <p className="chart-header">Revenue vs Orders</p>
          <hr className="mt-3 border-gray-700" />
          <div className="relative h-full w-full">
            <LineChart data={lineChartData} />
          </div>
        </div>
        <div className="mx-auto max-w-xs flex-wrap gap-y-4 space-y-4 sm:mx-0 sm:flex sm:max-w-none sm:justify-around sm:space-y-0">
          {/* DOUGNUT */}
          <div className="chart-wrapper max-w-xs">
            <p className="chart-header">Sales by Category (units)</p>
            <hr className="mt-3 border-gray-700" />
            <DoughnutChart cutout={60} data={salesByCategory} showLegend />
          </div>
          {/* Pie chart */}
          <div className="chart-wrapper max-w-xs">
            <p className="chart-header">Customers by age group ( % )</p>
            <hr className="mt-3 border-gray-700" />
            <Pie data={customersByAgeGroup} />
          </div>
          {/* Doug nut */}
          <div className="chart-wrapper max-w-xs">
            <p className="chart-header">Traffic by devices ( % )</p>
            <hr className="mt-3 border-gray-700" />
            <DoughnutChart
              cutout={80}
              data={trafficByDevices}
              showLegend={false}
            />
            <div className="divide-y divide-gray-800">
              {devicesLabels.map((deviceData) => (
                <div
                  key={deviceData.title}
                  className="flex items-center space-x-3 py-0.5"
                  style={{
                    color: deviceData.color,
                  }}
                >
                  <deviceData.Icon className="col-start-1 row-span-2 text-2xl" />
                  <p className="paragraph">{deviceData.title}</p>
                  <p>{deviceData.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stacked bar chart */}
        <div className="chart-wrapper h-96 shrink pb-12">
          <p className="chart-header">Revenue vs Orders</p>
          <hr className="mt-3 border-gray-700" />
          <div className="relative h-full w-full">
            <StackedBarChart data={stackedBarData} />
          </div>
        </div>
      </div>
      <div className="spacing">
        <h2 className="heading2">Top selling products</h2>
        <TableContainer>
          <table className="table">
            <thead className="table__head">
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="p-3" key={header.id}>
                      <div
                        className={`flex min-w-[70px] items-center space-x-2 ${
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

export default Home
