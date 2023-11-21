import React from 'react';
// import ShareButtons from './ShareButtons.jsx';

const Details = ({ slogan, description, features }) => (
  <div className='overview-details'>
    <h3 className='overview-slogan'>{slogan}</h3>
    <p className='overview-description'>{description}</p>
    <ul className='overview-feature-wrapper'>
      {features.map((feat, index) => {
        return (
          <li className='overview-feature' key={'overview-details-' + index}>
            The {feat.feature} is {feat.value}!
          </li>
        );
      })}
    </ul>
    <div className='overview-share-buttons'>
      < button className='share-facebook'>f</button>
      < button className='share-x'>x</button>
      < button className='share-pinterest'>P</button>
    </div>
  </div>
)

export default Details;