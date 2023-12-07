import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://backend-1875175380.us-east-1.elb.amazonaws.com:3001/',
});
