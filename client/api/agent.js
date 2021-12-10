import axios, { AxiosResponse } from 'axios'

// axios.defaults.baseURL = '/api';

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody)
}

const Products = {
  all: () => requests.get(`/product`),
  details: (id) => requests.get(`/product/${id}`),
  create: (post) => requests.post('/product', post),
  update: (id) => requests.put(`/product/${id}`, post),
  delete: (id) => requests.del(`/product/${id}`),
}

const Categories = {
  all: () => requests.get(`/category`),
  details: (id) => requests.get(`/category/${id}`),
  create: (post) => requests.post('/category', post),
  update: (id) => requests.put(`/category/${id}`, post),
  delete: (id) => requests.del(`/category/${id}`),
}

export default{
  Products,
  Categories
}
