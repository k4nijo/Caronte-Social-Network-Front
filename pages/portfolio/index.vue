<template>
  <div>
    <apexchart
      width="700"
      type="area"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'portfolio-chart',
  data() {
    return {
      chartOptions: {
        xaxis: {
          categories: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
        },
      },
      series: [
        {
          name: 'holdings',
          data: [],
        },
      ],
    }
  },
  async asyncData({ $axios, $auth }) {
    const portId = $auth.user.portfolio[0]._id
    const portfolio = await $axios.get(`/api/user/portfolio/${portId}/chart`)
    let newdata = portfolio.data.map(
      (elem) => (elem = parseInt(elem.total.toFixed(0)))
    )

    let dates = portfolio.data.map((elem) => {
      let dateObject = new Date(elem.date * 1000)
      let humanMonth = dateObject.toLocaleString('en-US', { month: 'short' })
      let humanDay = dateObject.toLocaleString('en-US', { day: 'numeric' })
      let together = `${humanDay} ${humanMonth}`
      return (elem = together)
    })

    return {
      series: [{ name: 'holdings', data: newdata }],
      chartOptions: { xaxis: { categories: dates } },
    }
  },
}
</script>

<style lang="scss" scoped></style>
