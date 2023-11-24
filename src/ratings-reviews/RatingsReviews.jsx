import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';
import { getReviewList, getReviewMetaData } from './lib/fetchFunctions.js';
import ModalOverlay from './utils/ModalOverlay.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';

const RatingsReviews = ({ id }) => {
  const [metaData, setMetaData] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('relevant');
  const [currentListLength, setCurrentListLength] = useState(0);
  const [starFilter, setStarFilter] = useState(0);
  const [modal, setModal] = useState(false);

  const totalReviews = useMemo(() => {
    let total = 0;
    for (let keys in metaData.recommended) {
      total += JSON.parse(metaData.recommended[keys]);
    }
    return total;
  }, [metaData]);

  const activeList = useMemo(() => {
    if (starFilter === 0) return reviewList.slice(0, currentListLength);
    return reviewList.filter(review => { return review.rating === starFilter });
  }, [reviewList, starFilter, currentListLength])

  const handleStarFilter = useCallback((number) => {
    number === starFilter ? setStarFilter(0) : setStarFilter(number);
  }, [starFilter]);

  const handleListIncrement = () => {
    setCurrentListLength(currentListLength + 2);
  };

  useEffect(() => {
    const getData = async() => {
      const [reviews, meta] = await Promise.all([getReviewList(id, currentPage, currentSort), getReviewMetaData(id)]);
      setReviewList(reviews.data.results);
      handleListIncrement();

      setMetaData(meta.data);
    }
    getData();
  }, [id])

  useEffect(() => {
    if (currentListLength === 0) return;
    if (currentListLength > reviewList.length) {
      getReviewList(id, currentPage + 1, currentSort)
        .then(({ data }) => {
          setReviewList([...reviewList, ...data.results]);
          setCurrentPage(currentPage + 1);
        })
    };
  }, [currentListLength, currentSort, currentPage]);

  useEffect(() => {
    getReviewList(id, 1, currentSort)
      .then(({ data }) => {
        setReviewList(data.results);
      })
  }, [currentSort])

  return (
    <section style={{ width: '100%'}}>
      <h1 className='ratings-reviews-title'>Ratings & Reviews</h1>
      <div className='ratings-reviews-container'>
          <RatingBreakdown data={metaData} total={totalReviews} handleStarFilter={handleStarFilter}/>
          <div>
            <div className='review-list-header'>
              {totalReviews} reviews, sorted by
              <select className='review-sort-options' onChange={(e) => setCurrentSort(e.target.value)}>
                <option value='relevant'>Relevance</option>
                <option value='newest'>Newest</option>
                <option value='helpful'>Most Helpful</option>
              </select>
            </div>
            <ReviewsList
              reviewList={activeList}
              handleListIncrement={handleListIncrement}
              setModal={setModal}
              showButton={currentListLength < totalReviews && starFilter === 0}
            />
          </div>
          {modal &&
            <ModalOverlay>
              <AddReviewForm data={metaData} setModal={setModal}/>
            </ModalOverlay>
          }
      </div>
    </section>
  )
}

export default RatingsReviews;