<template>
  <div class="max-h-96">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'

const store = useStore()

const series = computed(() => {
  return [
    {
      name: 'sdf',
      data: store.state.campaignDetail.chartData.map((item) => {
        return {
          x: new Date(item.date).getTime(),
          y: item.cost,
        }
      }),
    },
  ]
})

const chartOptions = computed(() => {
  return {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date('14 Nov 2012').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    // xaxis: {
    //   type: 'datetime',
    //   min: new Date('01 Mar 2012').getTime(),
    //   tickAmount: 6,
    // },
    tooltip: {
      x: {
        format: 'yyyy-MM-dd',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 8,
      min: new Date(store.state.campaignDetail.startDate).getTime(),
      max: new Date(store.state.campaignDetail.endDate).getTime(),
      labels: {
        rotateAlways: false,
        formatter: function (val, timestamp) {
          return format(new Date(timestamp), 'yyyy-MM-dd')
        },
      },
    },
  }
})
</script>
