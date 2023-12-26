<template>
  <div class="card-container">
    <div class="header">{{ title }}</div>
    <div class="content">{{ content }}</div>
    <div class="description">*{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'chip',
  props: ['title', 'content', 'description']
}
</script>

<style scoped>
.card-container {
  padding: 0px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  width: fit-content;
  height: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* justify-content: space-evenly */
}

.header {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 900;
  color: #ffa500;
  font-size: 20px;
  margin-top: 10px;
}

.content {
  font-size: 40px;
  font-size: 'Nunito', sans-serif;
}

.description {
  font-family: 'Nunito Sans', sans-serif;
  /* font-weight: 900; */
  color: #5d7283;
  font-size: 10px;
  font-style: italic;
}
</style>
