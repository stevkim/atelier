import React, { memo } from 'react';
import ProductBar from '../utils/ProductBar.jsx';

const ProductBreakdownList = ({ propertyList }) => (
  <div>
    {
        propertyList.map((property) => (
          <div key={property.id} className='product-rating-wrapper'>
            <h5 className='product-rating-title'>{property.characteristic}</h5>
            <ProductBar rating={Math.round((JSON.parse(property.rating) / 5) * 100)} />
            {property.characteristic === 'Comfort' || property.characteristic === 'Quality'
              ? (
                <div className='product-rating-description'>
                  <p>Poor</p>
                  <p>Perfect</p>
                </div>
              )
              : (
                <div className='product-rating-description'>
                  <p>Too Small</p>
                  <p>Perfect</p>
                  <p>Too Big</p>
                </div>
              )}
          </div>
        ))
      }
  </div>
);

export default memo(ProductBreakdownList);
