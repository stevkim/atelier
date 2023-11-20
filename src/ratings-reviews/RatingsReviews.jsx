import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';
import { getReviewList, getReviewMetaData } from './lib/fetchFunctions.js';
import ModalOverlay from './components/ModalOverlay.jsx';
// import AddReviewForm from './components/AddReviewForm.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';

const AddReviewForm = lazy(() => import('./components/AddReviewForm.jsx'))

const product_id = 40347;

const RatingsReviews = () => {
  const [metaData, setMetaData] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('relevant'); // cant be newest or helpful
  const [currentListLength, setCurrentListLength] = useState(0);
  const [starFilter, setStarFilter] = useState(0);

  const totalReviews = useMemo(() => {
    let total = 0;
    for (let keys in metaData.recommended) {
      total += JSON.parse(metaData.recommended[keys]);
    }
    return total;
  }, [metaData]);

  const handleListIncrement = () => {
    setCurrentListLength(currentListLength + 2);
  };

  const handleStarFilter = (number) => {
    if (number === starFilter) {
      setStarFilter(0);
    } else {
      setStarFilter(number);
    }
  }

  const setFilteredList = () => {
    if (starFilter === 0) {
      setActiveList(reviewList.slice(0, currentListLength));
    } else {
      let filteredList = reviewList.filter(review => {
        if (review.rating === starFilter) {
          return review
        }
      })
      setActiveList(filteredList.slice(0, currentListLength))
    }
  }

  useEffect(() => {
    const getData = async() => {
      const [reviews, meta] = await Promise.all([getReviewList(product_id, currentPage, currentSort), getReviewMetaData(product_id)]);
      setReviewList(reviews.data.results);
      handleListIncrement();
      console.log(reviews.data.results)

      setMetaData(meta.data);
      console.log(meta.data)
    }
    getData();
  }, [])

  useEffect(() => {
    if (currentListLength > reviewList.length) {
      getReviewList(product_id, currentPage + 1, currentSort)
        .then(({ data }) => {
          setReviewList([...reviewList, ...data.results]);
          setCurrentPage(currentPage + 1);
          setFilteredList();
        })
    } else if (currentListLength !== 0) {
      setFilteredList();
    }
  }, [currentListLength, reviewList, currentSort, starFilter]);

  useEffect(() => {
    getReviewList(product_id, 1, currentSort)
      .then(({data}) => {
        setReviewList(data.results);
        setCurrentPage(1);
        setCurrentListLength(2);
        setStarFilter(0);
      })
  }, [currentSort])

  return (
    <div style={{ width: '100%'}}>
      <h1 className='ratings-reviews-title'>Ratings & Reviews</h1>
      <div className='ratings-reviews-container'>
        <Suspense fallback={<div>Loading...</div>}>
          <RatingBreakdown data={metaData} total={totalReviews} handleStarFilter={handleStarFilter}/>
          <ReviewsList
            reviewList={activeList}
            handleListIncrement={handleListIncrement}
            setCurrentSort={setCurrentSort}
            totalReviews={totalReviews}
            currentListLength={currentListLength}
            starFilter={starFilter}
          />
          <ModalOverlay>
            <AddReviewForm data={metaData.characteristics}/>
          </ModalOverlay>
        </Suspense>
      </div>
    </div>
  )
}

export default RatingsReviews;