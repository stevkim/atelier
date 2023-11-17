import React from 'react';
// import ShareButtons from './ShareButtons.jsx';

const Details = ({ slogan, description, features }) => (
  <div id='overview-details'>
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
    < button id='share-facebook'>f</button>
    < button id='share-x'>x</button>
    < button id='share-pinterest'>P</button>
  </div>
)

export default Details;