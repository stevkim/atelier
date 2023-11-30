import React, { useState, useEffect } from 'react';

const Share = ({ id }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const newUrl = new URL(`http://localhost:3000/?product_id=${id}`);
    setUrl(newUrl.href);
  }, [id]);

  return (
    <div className='share-buttons'>
      <div className='fb-share-button' data-href={url} data-layout='button_count' data-size='small'>
        <a target='_blank' rel='noreferrer' href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse' className='fb-xfbml-parse-ignore' allow='geolocation'>
          Share
        </a>
      </div>
      <a target='_blank' rel='noreferrer' href='https://twitter.com/share?ref_src=twsrc%5Etfw' className='twitter-share-button' data-show-count='false' allow='geolocation'>
        Tweet
      </a>
      <a target='_blank' rel='noreferrer' href='https://www.pinterest.com/pin/create/button/' data-pin-do='buttonBookmark' allow='geolocation'>Pinterest</a>
    </div>
  );
};

export default Share;
