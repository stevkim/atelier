import axios from 'axios';

const getProductInfo = (productId) => {
  const url = `/products/${productId}`;
  const res = axios.get(url);
  return res;
};

const getProductStyles = (productId) => {
  const url = `/products/${productId}/styles`;
  const res = axios.get(url);
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
  const url = `/cart?sku_id=${skuNum}`;
  axios.post(url);
};

export {
  getOverviewById, addToCart, getProductInfo,
};
