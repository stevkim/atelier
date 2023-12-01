import React, { useState, useEffect } from 'react';

const Share = ({ id }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const newUrl = new URL(`${window.location}/?product_id=${id}`);
    setUrl(newUrl.href);
  }, [id]);

  return (
    <div className='share-buttons'>
      <a
        target='_blank'
        rel='noreferrer'
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        allow='geolocation'
        className='fb-share-button fb-xfbml-parse-ignore'
        data-href={url}
        data-layout='button_count'
        data-size='small'
      >
        Share
      </a>
      <a target='_blank' rel='noreferrer' href={`https://twitter.com/share?ref_src=${url}`} className='twitter-share-button' data-show-count='false' allow='geolocation'>
        Tweet
      </a>
      <a target='_blank' rel='noreferrer' href='https://www.pinterest.com/pin/create/button/' data-pin-do='buttonBookmark' allow='geolocation'>Pinterest</a>
    </div>
  );
};

export default Share;
