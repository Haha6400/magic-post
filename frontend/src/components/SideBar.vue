<template>
  <div class="side">
    <section id="sidebar">
      <!-- <a href="#" class="brand"><i class='bx bxs-smile icon'></i> AdminSite</a> -->
      <ul class="side-menu">
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            Trang chủ
          </a>
        </li>
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>

            Tra cứu đơn hàng</a
          >
        </li>
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            Dịch vụ</a
          >
        </li>
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>

            Tin tức</a
          >
        </li>
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            Về Magic Post</a
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {},
};
</script>

<style scoped>
a {
  text-decoration: none;
}

li {
  list-style: none;
}
.side {
  position: fixed;
  max-width: 260px;
  width: 100%;
  background-color: #ffffff;
  border-collapse: separate;
  border-radius: 10px;
  top: 2.5%;
  left: 15px;
  margin-left: 10px;
  border-radius: 12dp;
  height: 95%;
  overflow-y: auto;
  scrollbar-width: none;
  transition: all 0.3s ease;
  font-family: "Nunito Sans", sans-serif;
}
#sidebar {
  position: fixed;
  max-width: 260px;
  width: 100%;
  background: var(--light);
  border-collapse: separate;
  border-radius: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  transition: all 0.3s ease;
  z-index: 200;
  /* font-family: 'Nunito Sans', sans-serif;
    font-size: 20px; */
}
#sidebar.hide {
  max-width: 60px;
}
#sidebar.hide:hover {
  max-width: 260px;
}
#sidebar::-webkit-scrollbar {
  display: none;
}
#sidebar .brand {
  font-size: 24px;
  display: flex;
  align-items: center;
  height: 64px;
  font-weight: 700;
  color: var(--blue);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background: var(--light);
  transition: all 0.3s ease;
  padding: 0 6px;
}

#sidebar .icon {
  min-width: 48px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: left;
  margin-right: 6px;
}
#sidebar .icon-right {
  margin-left: auto;
  transition: all 0.3s ease;
}
#sidebar .side-menu {
  margin: 36px 0;
  padding: 0 20px;
  transition: all 0.3s ease;
}
#sidebar.hide .side-menu {
  padding: 0 6px;
}
#sidebar.hide:hover .side-menu {
  padding: 0 20px;
}
#sidebar .side-menu a {
  display: flex;
  align-items: center;
  font-size: 18px;
  /* color: var(--dark); */
  color: #2c3e50;
  color: black;
  font-weight: 500;
  padding: 12px 16px 12px 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 4px 0;
  white-space: nowrap;
  font-family: "Nunito Sans", sans-serif;
}
#sidebar .side-menu > li > a:hover {
  /* background: var(--grey); */
  background-color: #ffa500;
}
#sidebar .side-menu > li > a.active .icon-right {
  transform: rotateZ(90deg);
}
#sidebar .side-menu > li > a.active,
#sidebar .side-menu > li > a.active:hover {
  background: var(--blue);
  color: var(--light);
}
#sidebar .divider {
  margin-top: 24px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--dark-grey);
  transition: all 0.3s ease;
  white-space: nowrap;
}
#sidebar.hide:hover .divider {
  text-align: left;
}
#sidebar.hide .divider {
  text-align: center;
}
#sidebar .side-dropdown {
  padding-left: 54px;
  max-height: 0;
  overflow-y: hidden;
  transition: all 0.15s ease;
}
#sidebar .side-dropdown.show {
  max-height: 1000px;
}
#sidebar .side-dropdown a:hover {
  color: var(--blue);
}
#sidebar .ads {
  width: 100%;
  padding: 20px;
}
#sidebar.hide .ads {
  display: none;
}
#sidebar.hide:hover .ads {
  display: block;
}
#sidebar .ads .wrapper {
  background: var(--grey);
  padding: 20px;
  border-radius: 10px;
}
#sidebar .btn-upgrade {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  color: var(--light);
  background: var(--blue);
  transition: all 0.3s ease;
  border-radius: 5px;
  font-weight: 600;
  margin-bottom: 12px;
}
#sidebar .btn-upgrade:hover {
  background: var(--dark-blue);
}
#sidebar .ads .wrapper p {
  font-size: 12px;
  color: var(--dark-grey);
  text-align: center;
}
#sidebar .ads .wrapper p span {
  font-weight: 700;
}
/* SIDEBAR */

/* @media (max-width: 300px) {
  padding-left: 6rem;
} */
</style>
