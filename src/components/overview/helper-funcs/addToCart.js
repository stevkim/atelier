import axios from 'axios';

const addToCart = (skuNum, quantity) => {
  let url = '/cart?sku_id=' + skuNum;
  axios.post(url);
}

export default addToCart;