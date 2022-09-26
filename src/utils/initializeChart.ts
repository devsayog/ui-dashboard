import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

export const initializeChart = () => {
  ChartJs.defaults.color = '#d1d5db'
  // ChartJs.defaults.scale.grid.color = '#374151'
  // ChartJs.defaults.font.size = 30
  ChartJs.register(
    Title,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
  )
}
