import axios from 'axios';
require('dotenv').config();

const addToCart = (skuNum, quantity) => {
  let config = {
    method: 'post',
    url: process.env.API_URL + 'cart?sku_id=' + skuNum,
    headers: {
      Authorization: process.env.GIT_TOKEN
    }
  };

  axios.request(config)
}

export default addToCart;