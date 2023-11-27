import axios from 'axios';

const getProductInfo = (productId) => {
  let url = `/products/${productId}`;
  let res = axios.get(url);
  return res;
};

const getReviewMetadata = (productId) => {
  let url = '/reviews/meta/?product_id=' + productId;
  let res = axios.get(url);
  return res;
};

const getProductStyles = (productId) => {
  let url = '/products/' + productId + '/styles';
  let res = axios.get(url);
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

const addToCart = (skuNum, quantity) => {
  let url = '/cart?sku_id=' + skuNum;
  axios.post(url);
}

export { getOverviewById, addToCart };