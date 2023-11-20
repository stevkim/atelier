require('dotenv').config();
import axios from 'axios';

const requestUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const header = { Authorization: process.env.GIT_TOKEN };

export const updateHelpfulness = (id) => {
  console.log(id)
  return axios.put(`${requestUrl}/reviews/${id}/helpful`, null, { headers: header });
}

export const reportReview = (id) => {
  console.log(id)
  return axios.put(`${requestUrl}/reviews/${id}/report`, null, { headers: header });
}

export const getReviewList = (id, page, sort) => {
  console.log(sort)
  return axios.get(`${requestUrl}/reviews/?product_id=${id}&page=${page}&count=20&sort=${sort}`, { headers: header });
}

export const getReviewMetaData = (id) => {
  return axios.get(`${requestUrl}/reviews/meta/?product_id=${id}`, { headers: header });
}

export const postReview = (id, data) => {
  return axios.post(`${requestUrl}/reviews/?product_id=${id}`, data, { headers: header });
}