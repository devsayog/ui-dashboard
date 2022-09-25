import type { BubbleDataPoint, ChartData, ScatterDataPoint } from 'chart.js'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

interface IDoughnutChartProps {
  data: ChartData<
    'doughnut',
    (number | ScatterDataPoint | BubbleDataPoint | null)[],
    unknown
  >
  showLegend: boolean
}
const DoughnutChart = ({ data, showLegend }: IDoughnutChartProps) => {
  return (
    <Doughnut
      options={{
        responsive: true,
        cutout: 80,
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: showLegend,
            labels: {
              color: '#d1d5db',
              font: {
                size: 14,
              },
            },
          },
        },
      }}
      data={data}
    />
  )
}

export default DoughnutChart
