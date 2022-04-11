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
      portValues: [],
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [
            1, 2, 3, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
            1, 2, 3, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
            1, 2, 3, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
            1, 2, 3, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
          ],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    return { series: [{ name: 'series-1', data: newdata }] }
  },
}
</script>

<style lang="scss" scoped></style>
