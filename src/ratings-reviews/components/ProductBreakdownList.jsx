import React from 'react';
import ProductBar from './ProductBar.jsx';

const ProductBreakdownList = ({ propertyList }) => {
  return (
    <div>
      {propertyList &&
        propertyList.map((property, index) => {
         return (
          <div key={property.id} className='product-rating-wrapper'>
            <h4 className='product-rating-title'>{property.characteristic}</h4>
            <ProductBar rating={Math.round(JSON.parse(property.rating) / 5 * 100)} />
            {property.characteristic === 'Comfort' || property.characteristic === 'Quality'
              ? <div className='product-rating-description'>
                  <p>Poor</p>
                  <p>Perfect</p>
                </div>
              :  <div className='product-rating-description'>
                  <p>Too Small</p>
                  <p>Perfect</p>
                  <p>Too Big</p>
                </div>
            }
          </div>)
        })
      }
    </div>
  )
}

export default ProductBreakdownList;