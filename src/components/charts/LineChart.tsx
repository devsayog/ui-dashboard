import type { ChartData, ScatterDataPoint } from 'chart.js'
import { Line } from 'react-chartjs-2'

interface ILineChartProps {
  data: ChartData<'line', (number | ScatterDataPoint | null)[], unknown>
}
const LineChart = ({ data }: ILineChartProps) => {
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#d1d5db',
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: 'Line chart',
            color: '#d1d5db',
            font: {
              size: 16,
            },
          },
        },
      }}
      data={data}
    />
  )
}

export default LineChart
