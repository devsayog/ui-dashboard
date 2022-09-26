import type { ChartData } from 'chart.js'
import { Bar } from 'react-chartjs-2'

interface IStackedBarChart {
  data: ChartData<'bar', number[], string>
}

const StackedBarChart = ({ data }: IStackedBarChart) => {
  return (
    <Bar
      options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Stacked Budget - Expenses',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
              color: '#374151',
            },
          },
          y: {
            stacked: true,
            grid: {
              color: '#374151',
            },
          },
        },
      }}
      data={data}
    />
  )
}

export default StackedBarChart
