import axios from 'axios';

export const getProduct = (id) => {
  return axios.get(`/products/${id}`);
}

export const getRelatedProducts = (id) => {
  return axios.get(`/products/${id}/related`);
}

export const getProductStyles = (id) => {
  return axios.get(`/products/${id}/styles`);
}

export const getReviewsMetaData = (id) => {
  return axios.get(`/reviews/meta/?product_id=${id}`);
}