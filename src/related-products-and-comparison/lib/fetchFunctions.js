import axios from 'axios';

export const getProduct = (id) => axios.get(`/products/${id}`);

export const getRelatedProducts = (id) => axios.get(`/products/${id}/related`);

export const getProductStyles = (id) => axios.get(`/products/${id}/styles`);

export const getReviewsMetaData = (id) => axios.get(`/reviews/meta/?product_id=${id}`);
