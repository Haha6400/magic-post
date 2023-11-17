import axios from "axios";

axios.defaults.headers.common.authorization = localStorage.getItem("token");