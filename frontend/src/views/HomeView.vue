<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <p>Test</p>
    <!-- Banner -->
    <div class="banner">
      <div class="card">p</div>
    </div>
    <div class="banner">
      <div class="card">p</div>
      <div class="card">p</div>
    </div>
    <div class="banner">
      <div class="card">p</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
.container {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  /* background-color: #FFFFFF; */
}

.banner {
  display: flex;
	grid-gap: 20px;
	margin-top: 20px;
	flex-wrap: wrap;
  height: 10vh;
}
  
.card {
  flex-grow: 1;
	flex-basis: 400px;
	padding: 20px;
	border-radius: 12px;
	/* box-shadow: 4px 4px 16px rgba(0, 0, 0, .1); */
}
  

</style>
