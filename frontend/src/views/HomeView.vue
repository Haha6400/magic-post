<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- Banner -->
    <div class="banner">
      <div class="card">
        <div class="banner-text">
          <div class="banner-header">MAGIC POST</div>
          <div class="banner-description">
            Đồng hành cùng bạn <br />
            trên mọi nẻo đường
          </div>
        </div>
        <div class="image-header">
          <img alt="logo" src="../assets/home/header.jpg" />
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="col-card">
        <div class="content-header">Tra cứu đơn hàng</div>
        <div class="search-post">
          <img alt="logo" src="../assets/home/searchBanner.png" />
          <div class="search-side">
            <form class="search-bar">
              <input
                class="search-box"
                type="text"
                placeholder="Nhập mã vận đơn"
                v-model="search"
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="black"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </form>
            <router-link
              class="searchButton"
              type="button"
              to="/orderStatus"
              v-on:click="getOrderStatus()"
              >Tra cứu</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-card">
        <div class="content-header">Tin tức</div>
        <div class="exam-container">
          <div class="exam-image">
            <img alt="Vue logo" src="../assets/home/img.png" />
          </div>

          <div class="text">
            <div class="card-header">
              <router-link class="card-title" to="/">Giao trọn trái tim </router-link>
              <p class="card-description">
                <i
                  >Cùng Magic Post điểm lại 11 năm hành trình trên con đường xây dựng và phát
                  triển...</i
                >
              </p>
            </div>
          </div>
        </div>
        <div class="exam-container">
          <div class="exam-image">
            <img alt="Vue logo" src="../assets/home/img2.png" />
          </div>

          <div class="text">
            <div class="card-header">
              <router-link class="card-title" to="/">Chủ nhật hết xảy </router-link>
              <p class="card-description">
                <i>Cùng Magic Post tìm hiểu chương trình giảm 50% phí giao hàng..</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="card">
        <div class="banner-text">
          <div class="banner-header">Về chúng tôi</div>
          <div class="banner-description" style="font-size: 15px">
            Magic Post là một công ty vận chuyển hàng đầu, chuyên cung cấp dịch vụ vận chuyển nhanh
            chóng và đáng tin cậy. Với đội ngũ nhân viên chuyên nghiệp và hệ thống logistics hiện
            đại, chúng tôi cam kết mang đến trải nghiệm gửi hàng an toàn và tiện lợi. Đặt niềm tin
            vào chúng tôi, bạn sẽ trải qua sự thuận tiện và đảm bảo mọi đợt vận chuyển đều diễn ra
            suôn sẻ.
          </div>
        </div>
        <div class="image-footer">
          <img alt="logo" src="../assets/home/footer.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      search: ''
    }
  },

  methods: {
    getOrderStatus() {
      localStorage.setItem('orderCode', this.search)
    }
  }
}
</script>

<style scoped>
::placeholder {
  color: #000000;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-in forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  opacity: 0;
  transition: opacity 1s;

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
}
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
  flex-grow: 1;
  flex-basis: 400px;
  /* padding: 20px; */
  border-radius: 12px;
  /* height: fit-content; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  /* min-width: 50%; */
}

.banner-text {
  /* margin-left: 20vh;
  margin-top: 2.5vh; */
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-around;
  justify-content: center;
  width: 40%;
  /* min-width: 300px; */
  margin: 10px;
}

.banner-header {
  font-family: 'Nunito', sans-serif;
  color: #ffa500;
  font-size: 50px;
}

.banner-description {
  font-family: 'Nunito Sans', sans-serif;
  color: #5d7283;
  font-size: 20px;
}

.image-header {
  width: 600px;
  /* display: flex;
  justify-content: center; */
  margin: 10px;
  /* max-width: 100%; */
  height: auto; /* Maintain the aspect ratio */
}

.image-footer {
  width: 300px;
  /* display: flex;
  justify-content: center; */
  margin: 10px;
  /* max-width: 100%; */
  height: auto; /* Maintain the aspect ratio */
  display: flex;
  align-items: center;
}

.image-footer img {
  width: 100%;
}
.image-header img {
  width: 100%;
}

.col-card {
  flex-grow: 1;
  flex-basis: 400px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  gap: 10px;
}

.content-header {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 900;
  color: #ffa500;
  font-size: 25px;
  margin-top: 10px;
}

.search-post {
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* gap: 10px */
}

.search-post img {
  /* width: 220px; */
  width: 40%;
  min-width: 155px;
}

.search-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.search-bar {
  box-sizing: border-box;
  /* width: 70%; */
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #f7b85e;
  border-radius: 30px;
}
.search-bar input {
  background: transparent;
  color: #000000;
  flex: 1;
  border: 0;
  outline: none;
  padding: 2% 3%;
  font-family: 'Nunito Sans', sans-serif;
}

.search-bar button svg {
  padding-right: 20px;
  height: 15px;
}
.search-bar button {
  border: none;
  background: none;
}

.searchButton {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 40%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.searchButton:hover {
  background-color: #f7b85e;
  text-decoration: none;
  border-radius: 30px;
  width: 40%;
  height: 25px;
  font-family: 'Nunito Sans', sans-serif;
  color: #000000;
  text-align: center;
}

.exam-container {
  display: flex;
  flex-direction: row;
  padding-bottom: 5%;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.card-title {
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-size: 20px;

  display: flex;
  align-items: center;

  color: #000000;
  text-decoration: none;
}

.card-title:hover {
  color: #f7b85e;
}

.card-header:hover {
  color: #f7b85e;
}

.exam-image {
  /* width: 30%; */
  max-width: 200px;
}

.exam-image img {
  width: 70%;
  height: 100%;
  object-fit: cover;

  border-radius: 10px;
}

.card-header {
  /* width: 560px; */
  display: flex;
  flex-direction: column;
}

.card-description {
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 0%;
  color: #637381;
}

.aboutus {
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.aboutus li {
  font-family: 'Nunito Sans', sans-serif;
  font-size: larger;
  font-weight: 500;
}

.icon {
  min-width: 48px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: left;
  margin-right: 6px;
}

@media (max-width: 900px) {
  /* .banner-description {
    visibility: hidden;
  } */
  .card {
    min-height: 100px;
  }

  .banner-header {
    font-size: 40px;
  }

  .banner-description {
    font-size: 20px;
  }

  .image-header {
    visibility: hidden;
    width: 0%;
  }

  .banner-text {
    width: 100%;
  }
}
</style>
