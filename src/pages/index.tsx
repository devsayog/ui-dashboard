import { Pie } from 'react-chartjs-2'

import DoughnutChart from '@/components/charts/DoughnutChart'
import LineChart from '@/components/charts/LineChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import OverviewCard from '@/components/dashboard/OverviewCard'
import {
  customersByAgeGroup,
  devicesLabels,
  lineChartData,
  overviewCards,
  salesByCategory,
  stackedBarData,
  trafficByDevices,
} from '@/data/data'
import { initializeChart } from '@/utils/initializeChart'

initializeChart()
const Home = () => {
  return (
    <section aria-labelledby="page-title" className="section">
      <h1 id="page-title" className="heading1 pt-4 lg:pt-0">
        Welcome back, John
      </h1>
      <p className="paragraph text-gray-500">
        Here&apos;s current status of your eStore.
      </p>
      <div className="my-3 grid gap-4 sm:grid-cols-2 md:my-6 md:grid-cols-3 xl:my-8 2xl:grid-cols-4">
        {overviewCards.map((cardData) => (
          <OverviewCard {...cardData} key={cardData.title} />
        ))}
      </div>
      <div className="space-y-4">
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
    </section>
  )
}

export default Home
