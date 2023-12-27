<template>
  <p>More about us - Coming soon</p>
</template>

<script></script>

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
  height: fit-content;
  flex-grow: 1;
  flex-basis: 300px;
}
</style>
