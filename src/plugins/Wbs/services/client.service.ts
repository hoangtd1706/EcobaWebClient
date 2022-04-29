import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.ecoba.com.vn/api/v1/t",
  headers: {
    "content-type": "application/json",
  },
});
