import axios from "axios";

const instance = axios.create({
  baseURL: "https://enigmatic-everglades-48569.herokuapp.com",
});

export default instance;
