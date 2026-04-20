import axios from 'axios';


const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
});

// Fetches all products and formats them for our components
export const fetchProducts = () => api.get('/products').then(res => ({
  ...res,
  data: res.data.products.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail, 
    rating: { rate: p.rating, count: Math.floor(Math.random() * 100) }
  }))
}));


export const fetchProductById = (id) => api.get(`/products/${id}`).then(res => ({
  ...res,
  data: {
    ...res.data,
    image: res.data.thumbnail 
  }
}));


export const fetchCategories = () => api.get('/products/category-list');


export const fetchProductsByCategory = (category) => api.get(`/products/category/${category}`).then(res => ({
  ...res,
  data: res.data.products.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail,
    rating: { rate: p.rating, count: Math.floor(Math.random() * 100) }
  }))
}));