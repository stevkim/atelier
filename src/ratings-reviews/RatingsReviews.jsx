import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';
import { getReviewList, getReviewMetaData } from './lib/fetchFunctions.js';
import ModalOverlay from './utils/ModalOverlay.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ReviewsHeader from './components/ReviewsHeader.jsx';
import { getTotalReviewCount } from './lib/utilityFunctions.js';

const RatingsReviews = ({ id }) => {
  const [metaData, setMetaData] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, sort: 'relevant' });
  const [filter, setFilter] = useState({ currentLength: 10, stars: 0});
  const [modal, setModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const activeListRef = useRef(null);

  const totalReviews = useMemo(() => getTotalReviewCount(metaData.recommended), [metaData]);

  const activeList = useMemo(() => {
    if (filter.stars === 0) return reviewList.slice(0, filter.currentLength);
    return reviewList.filter(review => { return review.rating === filter.stars }).slice(0, filter.currentLength);
  }, [reviewList, filter]);

  const handleStarFilter = useCallback((number) => {
    number === filter.stars ? setFilter({...filter, stars: 0}) : setFilter({...filter, stars: number});
    activeListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  const handleSort = useCallback((value) => {
    setPagination({...pagination, sort: value});
  }, [pagination]);

  const handleListIncrement = () => {
    setFilter({...filter, currentLength: filter.currentLength + 10 });
  };

  useEffect(() => {
    getReviewMetaData(id)
      .then(({ data }) => {
        setMetaData(data);
      })
  }, [id]);

  useEffect(() => {
    setDisable(false);
    getReviewList(id, { page: 1, sort: pagination.sort })
      .then(({ data }) => {
        setReviewList(data.results);
        setFilter({...filter, currentLength: 10 });
        setPagination({...pagination, page: 1 });
      })
      .finally(() => {
        activeListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      })
  }, [id, pagination.sort]);

  useEffect(() => {
    if (reviewList.length === 0 || disable) return;
    if (filter.currentLength >= reviewList.length) {
      getReviewList(id, pagination, true)
        .then(({ data }) => {
          if (reviewList.length === [...reviewList, ...data.results].length) {
            return setDisable(true);
          }
          setReviewList([...reviewList, ...data.results]);
          setPagination({...pagination, page: pagination.page + 1});
        })
    };
  }, [filter.currentLength, reviewList]);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'scroll';
  }, [modal]);

  return (
    <section className='ratings-reviews-wrapper'>
      <h1 className='ratings-reviews-title'>Ratings & Reviews</h1>
      <div className='ratings-reviews-container'>
          <RatingBreakdown data={metaData} total={totalReviews} handleStarFilter={handleStarFilter}/>
          <ReviewsList
            reviewList={activeList}
            handleListIncrement={disable ? () => {return;} : handleListIncrement}
            setModal={setModal}
            totalReviews={totalReviews}
            setSort={handleSort}
            ref={activeListRef}
          />
          {modal &&
            <ModalOverlay>
              <AddReviewForm data={metaData} setModal={setModal}/>
            </ModalOverlay>
          }
      </div>
    </section>
  );
};

export default RatingsReviews;