<template>
  <div>
    <apexchart
      width="700"
      type="polarArea"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'portfolio-pie-chart',
  data() {
    return {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chartOptions: {
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.8,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
