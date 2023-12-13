<template>
  <div class="container">
    <div class="banner">
      <div class="card">
        <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
      </div>
      <div class="card">
        jk
      </div>
      <div class="card">
        jk
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // options: {},
      // series: [44, 55, 41, 17, 15],
      // labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'PineApple']
      options: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
        dataLabels: {
          enabled: false
        },
        
      },
      series: [44, 55, 13, 33]
    }
  }
}
</script>

<style scoped>
.container {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  overflow-y: scroll;
  height: 95vh;
  border-radius: 12px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  display: none;
}
.banner {
  display: flex;
  grid-gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.card {
  /* flex-grow: 1;
  flex-basis: 400px;
  padding: 20px;
  border-radius: 12px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  min-width: 50%; */
  height: fit-content;
  flex-grow: 1;
  flex-basis: 300px;

}


</style>
