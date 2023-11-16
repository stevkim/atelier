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