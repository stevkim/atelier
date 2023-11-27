import axios from 'axios';

const addToCart = (skuNum, quantity) => {
  const config = {
    method: 'post',
    url: `/cart?sku_id=${skuNum}`,
  };

  axios.request(config);
};

export default addToCart;
