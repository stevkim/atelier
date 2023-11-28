import axios from 'axios';

const getProductInfo = (productId) => {
  const url = `/products/${productId}`;
  const res = axios.get(url);
  return res;
};

const getReviewMetadata = (productId) => {
  const url = `/reviews/meta/?product_id=${productId}`;
  const res = axios.get(url);
  return res;
};

const getProductStyles = (productId) => {
  const url = `/products/${productId}/styles`;
  const res = axios.get(url);
  return res;
};

const getOverviewById = async (productId) => {
  const productLevelInfo = await getProductInfo(productId);
  const reviewMetadata = await getReviewMetadata(productId);
  const styleInfo = await getProductStyles(productId);
  const res = {
    id: productId,
    title: productLevelInfo.data.name,
    category: productLevelInfo.data.category,
    reviews: reviewMetadata.data.ratings,
    slogan: productLevelInfo.data.slogan,
    features: productLevelInfo.data.features,
    description: productLevelInfo.data.description,
    styles: styleInfo.data.results,
  };
  return res;
};

const addToCart = (skuNum) => {
  const url = `/cart?sku_id=${skuNum}`;
  axios.post(url);
};

export { getOverviewById, addToCart };
