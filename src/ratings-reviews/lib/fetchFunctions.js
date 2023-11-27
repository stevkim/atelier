import axios from 'axios';

export const updateHelpfulness = (id) => {
  return axios.put(`/reviews/${id}/helpful`);
}

export const reportReview = (id) => {
  console.log(id)
  return axios.put(`/reviews/${id}/report`);
}

export const getReviewList = (id, pagination, nextPage = false) => {
  const { page, sort } = pagination;
  return axios.get(`/reviews/?product_id=${id}&page=${nextPage ? page + 1 : page}&count=50&sort=${sort}`);
}

export const getReviewMetaData = (id) => {
  return axios.get(`/reviews/meta/?product_id=${id}`);
}

export const postReview = (id, data) => {
  return axios.post(`/reviews/?product_id=${id}`, data);
}