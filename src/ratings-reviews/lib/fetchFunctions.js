/* istanbul ignore file */
import axios from 'axios';

export const updateHelpfulness = (id) => axios.put(`/reviews/${id}/helpful`);

export const reportReview = (id) => axios.put(`/reviews/${id}/report`);

export const getReviewList = (id, pagination, nextPage = false) => {
  const { page, sort } = pagination;
  return axios.get(`/reviews/?product_id=${id}&page=${nextPage ? page + 1 : page}&count=50&sort=${sort}`);
};

export const getReviewMetaData = (id) => axios.get(`/reviews/meta/?product_id=${id}`);

export const postReview = (id, data) => axios.post(`/reviews/?product_id=${id}`, data);
