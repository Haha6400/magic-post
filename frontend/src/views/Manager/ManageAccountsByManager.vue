<template>
  <div class="container">
    <h1 class="loginHeader">Quản lý tài khoản</h1>

    <div class="buttonList">
      <form class="search-bar">
        <input class="search-box" type="text" placeholder="Tìm kiếm tài khoản" v-model="search" />
        <button type="submit">
          <img src="@/assets/logo.png" />
        </button>
      </form>

      <router-link class="signup" type="button" to="/manager/createAccount">
        + Tạo tài khoản</router-link
      >
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
        :items="dataList"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <button v-on:click="deleteAccount(item._id)">
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <button>
            <router-link :to="{ name: 'accountDetail', params: { id: item._id } }">
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
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      loading: true,
      dataList: [],
      page: 1,
      itemsPerPage: 6,
      search: '',
      headers: [
        {
          align: 'center',
          key: 'userName',
          title: 'Username'
        },
        { key: 'email', title: 'Email', align: 'center' },
        { key: 'phoneNumber', title: 'SĐT', align: 'center' },
        { key: 'role', title: 'Chức vụ', align: 'center' },
        //   { key: 'workplace', title: 'Nơi làm việc', align: 'center' },
        { title: 'Chi tiết', sortable: false, align: 'center', text: 'Chi tiết', value: 'action' }
      ]
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.dataList.length / this.itemsPerPage)
    }
  },

  async created() {
    let url = 'http://localhost:3000/api/accounts/wp'
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.staffAccounts)
        this.dataList = response.data.staffAccounts
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        // toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
        //   {
        //     autoClose: 1000
        //   }
      })
  },

  methods: {
    deleteAccount(id) {
      this.loading = true
      let url = 'http://localhost:3000/api/accounts/' + id
      axios
        .delete(url)
        .then((response) => {
          console.log(response.data)
          console.log('delete')
          this.getList()
          this.loading = true
          toast.success('Deleted successfully', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 100
            }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Delete failed', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
        })
    },

    getList() {
      let url = 'http://localhost:3000/api/accounts/wp'
      axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.dataList = response.data.staffAccounts
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          toast.error('???', { position: toast.POSITION.BOTTOM_RIGHT }),
            {
              autoClose: 1000
            }
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

.v-card {
  margin-right: 7%;
  margin-left: 7%;
  height: 70%;
  /* max-height: 65%; */
  overflow-y: scroll;
  /* min-height: 70%; */
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
  /*width: 15%;*/
  min-width: 140px;
  height: 40px;
  /* height: 56px; */

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
.form-control {
  width: 15%;
}
</style>
