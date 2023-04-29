<template>
  <div class="max-h-96">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'Chart',
  components: {
    Line,
  },
  data() {
    return {
      chartData: {
        labels: [
          '2023-04-16',
          '2023-04-17',
          '2023-04-18',
          '2023-04-19',
          '2023-04-20',
          '2023-04-21',
          '2023-04-22',
        ],
        datasets: [
          {
            label: 'Trand',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        height: '380px',
        scales: {
          yAxes: {
            display: false
          }
        }
      },
    }
  },
}
</script>
