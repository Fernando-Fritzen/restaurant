import axios from "axios";

export const api = axios.create({
  baseURL: "http://ab5297476bb184945a35c8195e2ed33a-1703732009.us-east-1.elb.amazonaws.com:3001/",
});
