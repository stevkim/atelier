import React from 'react';
import Reviews from './Reviews.jsx';
import StylesView from './StylesView.jsx';
import Price from '../../components/price/Price.jsx';
import AddToCart from './addToCart/AddToCart.jsx';
import './styles.css'

const Info = ({ product, style, selectedStyle, updateStyle }) => (
  <div className='overview-overview'>
    < Reviews product={product} />
    <div className='overview-category'>
      {product.category}
    </div>
    <h3 className='overview-title'>{product.title}</h3>
    < Price selectedStyle={selectedStyle} includeStyle={true}/>
    < StylesView styleIndex={style} styles={product.styles} updateStyle={updateStyle} />
    < AddToCart skus={selectedStyle.skus} />
    <div className='overview-share-buttons'>
      < button className='share-facebook'>f</button>
      < button className='share-x'>x</button>
      < button className='share-pinterest'>P</button>
    </div>
  </div>
);

export default Info;