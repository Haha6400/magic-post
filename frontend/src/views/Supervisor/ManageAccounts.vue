<template>
  <div class="container">
    <h1 class="loginHeader">Quản lý tài khoản</h1>

    <div class="buttonList">
      <form class="search-bar">
        <input
          class="search-box"
          type="text"
          placeholder="Tìm kiếm tài khoản"
          v-model="search"
        />
        <button type="submit">
          <img src="@/assets/logo.png" />
        </button>
      </form>

      <router-link class="signup" type="button" to="/admin/addExam">
        + Tạo tài khoản</router-link
      >
    </div>

    <div>
      <b-table sticky-header :items="items" head-variant="light"></b-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' }
        ]
      }
    }
  }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,400;0,6..12,700;1,6..12,300&family=Nunito:wght@800&display=swap");
.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: flex-start;
  min-width: 300px;
  background-color: #ffffff;
  gap: 20px;
}

.loginHeader {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 32px;
}

.buttonList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 30px;

  padding-bottom: 2%;
  gap: 20px;

  margin-right: 7%;
}
.search-bar {
  box-sizing: border-box;
  /*width: 15%;*/
  min-width: 140px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #ffe4b2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
.search-bar input {
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 2% 3%;
  font-family: "Nunito Sans", sans-serif;
}
.search-bar button img {
  width: 45px;
  padding-right: 15px;
}
.search-bar button {
  border: none;
  background: none;
}
.signup {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f7b85e;

  font-family: "Nunito Sans", sans-serif;
  font-weight: regular;
  width: 12%;
  min-width: 140px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  color: #000000;
}
</style>
