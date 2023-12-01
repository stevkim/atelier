import axios from 'axios';

const getProductInfo = (productId) => {
  const url = `/products/${productId}`;
  const res = axios.get(url);
  return res;
};

const getProductStyles = async (productId) => {
  const url = `/products/${productId}/styles`;
  const res = await axios.get(url);
  return res;
};

const getOverviewById = async (productId, productInfo, reviewMetaData) => {
  const styleInfo = await getProductStyles(productId);
  const res = {
    id: productId,
    title: productInfo.name,
    category: productInfo.category,
    reviews: reviewMetaData.ratings,
    slogan: productInfo.slogan,
    features: productInfo.features,
    description: productInfo.description,
    styles: styleInfo.data.results,
  };
  return res;
};

const addToCart = (skuNum) => {
  console.log('skuNum is...', skuNum);
  const url = '/cart';
  const body = { sku_id: skuNum };
  axios.post(url, body);
};

export {
  getOverviewById, addToCart, getProductInfo, getProductStyles,
};
