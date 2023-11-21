import axios from 'axios';
require('dotenv').config();

const getProductInfo = (productId) => {
  let url = process.env.API_URL + 'products/' + productId;
  let headers = {
    headers: {
      Authorization: process.env.GIT_TOKEN,
    }
  }
  let res = axios.get(url, headers);
  return res;
};

const getReviewMetadata = (productId) => {
  let url = process.env.API_URL + 'reviews/meta/?product_id=' + productId;
  let headers = {
    headers: {
      Authorization: process.env.GIT_TOKEN,
    }
  };
  let res = axios.get(url, headers);
  return res;
};

const getProductStyles = (productId) => {
  let url = process.env.API_URL + 'products/' + productId + '/styles';
  let headers = {
    headers: {
      Authorization: process.env.GIT_TOKEN,
    }
  };
  let res = axios.get(url, headers);
  return res;
};

const getOverviewById = async (productId) => {
  let productLevelInfo = await getProductInfo(productId);
  let reviewMetadata = await getReviewMetadata(productId);
  let styleInfo = await getProductStyles(productId);
  let res = {
    id: productId,
    title: productLevelInfo.data.name,
    category: productLevelInfo.data.category,
    reviews: reviewMetadata.data.ratings,
    slogan: productLevelInfo.data.slogan,
    features: productLevelInfo.data.features,
    description: productLevelInfo.data.description,
    styles: styleInfo.data.results
  }
  return res;
};

export default getOverviewById;