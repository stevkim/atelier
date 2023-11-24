import axios from 'axios';

const addToCart = (skuNum, quantity) => {
  let config = {
    method: 'post',
    url: '/cart?sku_id=' + skuNum,
  };

  axios.request(config)
}

export default addToCart;