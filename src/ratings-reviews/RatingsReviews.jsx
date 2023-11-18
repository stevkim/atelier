import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';
import { getReviewList, getReviewMetaData } from './lib/fetchFunctions.js';

const product_id = 40346;

const RatingsReviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('relevant'); // cant be newest or helpful
  const [currentListLength, setCurrentListLength] = useState(0);
  const [metaData, setMetaData] = useState({});

  const totalReviews = useMemo(() => {
    let total = 0;
    for (let keys in metaData.recommended) {
      total += JSON.parse(metaData.recommended[keys]);
    }
    return total;
  }, [metaData])

  const handleListIncrement = () => {
    setCurrentListLength(currentListLength + 2);
  };

  useEffect(() => {
    const getData = async() => {
      const [reviews, meta] = await Promise.all([getReviewList(product_id, currentPage, currentSort), getReviewMetaData(product_id)]);
      setReviewList(reviews.data.results);
      handleListIncrement();

      setMetaData(meta.data);
    }
    getData();
  }, [])

  useEffect(() => {
    if (currentListLength > reviewList.length) {
      getReviewList(product_id, currentPage + 1, currentSort)
        .then(({ data }) => {
          setReviewList([...reviewList, ...data.results]);
          setCurrentPage(currentPage + 1);
          setActiveList(reviewList.slice(0, currentListLength));
        })
    } else if (currentListLength !== 0) {
      setActiveList(reviewList.slice(0, currentListLength));
    }
  }, [currentListLength, reviewList, currentSort]);

  useEffect(() => {
    getReviewList(product_id, currentPage, currentSort)
      .then(({data}) => {
        setReviewList(data.results);
        setCurrentPage(1);
        setCurrentListLength(2);
      })
  }, [currentSort])

  return (
    <div>
      <h1 className='ratings-reviews-title'>Ratings & Reviews</h1>
      {activeList && <ReviewsList reviewList={activeList} handleListIncrement={handleListIncrement} setCurrentSort={setCurrentSort} totalReviews={totalReviews} />}
    </div>
  )
}

export default RatingsReviews;