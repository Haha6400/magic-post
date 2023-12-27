<template>
  <div class="container">
    <h1 class="loginHeader">Quản lý điểm tập kết</h1>

    <div class="buttonList">
      <form class="search-bar">
        <input class="search-box" type="text" placeholder="Tìm kiếm" v-model="search" />
        <button type="submit">
          <img src="@/assets/logo.png" />
        </button>
      </form>

      <button class="signup" type="button" @click="dialog = true">+ Tạo điểm mới</button>
    </div>

    <div class="loading">
      <v-progress-circular
        v-if="loading"
        color="#ffa500"
        align-items="center"
        indeterminate
        :size="34"
      ></v-progress-circular>
    </div>

    <v-card flat title="">
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items-per-page="itemsPerPage"
        :items="warehouseList"
        :search="search"
      >
        <template v-slot:item.num="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.hubName="{ item }">
          <div v-for="hub in item.lowerBranchName">{{ hub }} <br /></div>
        </template>

        <template v-slot:item.action="{ item }">
          <button>
            <router-link :to="{ name: 'workplaceStatistics', params: { id: item._id } }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="black"
                class="w-6 h-6 icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </router-link>
          </button>
        </template>

        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <div class="popupHeader">Tạo điểm tập kết mới</div>

        <div class="input-container">
          <label for="exampleInputEmail1" class="form-label">Tên điểm tập kết</label>
          <input class="form-control" id="exampleInputEmail1" v-model="name" required />
        </div>

        <div class="bottomButton">
          <button @click="dialog = false" class="btn btn--green-1" style="width: fit-content">
            Đóng
          </button>

          <button
            v-on:click="createWarehouse()"
            class="btn btn--green-1"
            style="width: fit-content"
          >
            Lưu
          </button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

export default {
  data() {
    return {
      dialog: false,
      loading: true,
      warehouseList: [],
      page: 1,
      itemsPerPage: 3,
      search: '',
      headers: [
        { text: '1', value: 'num', title: 'Số thứ tự', sortable: false },
        { key: 'name', title: 'Tên điểm tập kết', align: 'center' },
        { value: 'hubName', title: 'Các điểm giao dịch', align: 'center' }, //key: 'lowerBranchName',
        { title: 'Chi tiết', sortable: false, align: 'center', text: 'Chi tiết', value: 'action' }
      ]
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.warehouseList.length / this.itemsPerPage)
    }
  },

  async created() {
    // this.dialog = false
    let url = 'http://localhost:3000/api/workplace/all/warehouse'
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.warehouseList = response.data.allWarehouse
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    async createWarehouse() {
      let url = 'http://localhost:3000/api/workplace/create/warehouse'
      await axios
        .post(url, { name: this.name })
        .then((response) => {
          console.log(response.data)
          this.dialog = false
          this.getList()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getList() {
      let url = 'http://localhost:3000/api/workplace/all/warehouse'
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.warehouseList = response.data.warehouse.allWarehouse
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: center;
  min-width: 300px;
  background-color: #ffffff;
  gap: 10px;
  overflow-y: scroll;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  height: 95vh;
  border-radius: 12px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  display: none;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loginHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 32px;
}

.popupHeader {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #ffa500;
  line-height: 28px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
}

.v-card {
  margin-right: 7%;
  margin-left: 7%;
  height: 70%;
  /* max-height: 65%; */
  overflow-y: scroll;
  /* min-height: 70%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
}

.v-card-text {
  padding: 0;
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
  margin-left: 7%;
}
.search-bar {
  box-sizing: border-box;
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
  font-family: 'Nunito Sans', sans-serif;
}
.search-bar button img {
  width: 45px;
  padding-right: 15px;
}
.search-bar button {
  border: none;
  background: none;
}

.editCol {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.icon {
  width: 20px;
  height: 20px;
}

.searchButton {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 80%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
}

.searchButton:hover {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 80%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.signup {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f7b85e;

  font-family: 'Nunito Sans', sans-serif;
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

button {
  margin: 2px;
}
.v-card {
  border-radius: 30px;
}

.form-label {
  margin-bottom: 5px;
}

label {
  margin-bottom: 5px;
  align-items: left;
}

.row-container {
  display: flex;
  flex-direction: row;
  gap: 5%;
}

.input-container {
  width: 50%;
  align-items: left;
}

.form-control {
  /* background-color: white; */
  border-radius: 18px;
  width: 100%;
  height: 50px;
  background-color: #ffe4b2;
  /* margin-right: 10%;
    margin-left: 10%; */
}

.btn {
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 14px;
  color: #333;
  background-color: #ffe4b2;
  border: 0;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    font-family: 'Nunito Sans', sans-serif;
    border: 0;
    background-color: #ffe4b2;
  }

  &--green-1 {
    background-color: #ffe4b2;
    border: 0;
    color: #000;
    margin-left: auto;
    font-family: 'Nunito Sans', sans-serif;
  }
}

.bottomButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.bottomButton button:hover {
  background-color: #ffe4b2;
}
</style>
