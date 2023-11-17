import React from 'react';
// import ShareButtons from './ShareButtons.jsx';

const Details = ({ slogan, description, features }) => (
  <div className='overview-details'>
    <h3>{slogan}</h3>
    <p>{description}</p>
    <ul>
      {features.map((feat, index) => {
        return (
          <li className='overview-feature' key={'overview-details-' + index}>
            The {feat.feature} is {feat.value}!
          </li>
        );
      })}
    </ul>
    < button className='share-facebook'>f</button>
    < button className='share-x'>x</button>
    < button className='share-pinterest'>P</button>
  </div>
)

export default Details;