<template>
  <div>
    <apexchart
      width="700"
      type="polarArea"
      :options="chartOptions"
      :series="series"
      :labels="labels"
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
        labels: [],
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
  async asyncData({ $axios, $auth }) {
    const portfolio = await $axios.get(
      `/api/user/portfolio/${$auth.user.portfolio[0]._id}/chart/piechart`
    )
    let max = portfolio.data
      .map((elem) => (elem = elem.totalInit))
      .reduce((p, c) => p + c, 0)
    let percentage = portfolio.data.map((elem) => {
      return (elem = ((elem.totalInit / max) * 100).toFixed(2))
    })
    let names = portfolio.data.map((elem) => (elem = elem.coin))
    return { series: [...percentage], chartOptions: { labels: [...names] } }
  },
}
</script>

<style lang="scss" scoped></style>
