import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';
import { getReviewList } from './lib/fetchFunctions.js';
import ModalOverlay from './utils/ModalOverlay.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';

const RatingsReviews = ({ id, metaData }) => {
  const [reviewList, setReviewList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, sort: 'relevant' });
  const [filter, setFilter] = useState({ currentLength: 10, stars: 0 });
  const [modal, setModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const activeListRef = useRef(null);

  const backToTop = () => activeListRef.current.scrollTo({ top: 0, behavior: 'smooth' });

  const activeList = useMemo(() => {
    if (filter.stars === 0) return reviewList.slice(0, filter.currentLength);
    return reviewList.filter((review) => review.rating === filter.stars)
      .slice(0, filter.currentLength);
  }, [reviewList, filter]);

  const handleStarFilter = (number) => {
    setDisable(false);
    if (number === filter.stars) {
      setFilter({ ...filter, stars: 0 });
    } else {
      setFilter({ ...filter, stars: number });
    }
    backToTop();
  };

  const handleSort = useCallback((value) => {
    setDisable(false);
    getReviewList(id, { page: 1, sort: value })
      .then(({ data }) => {
        setReviewList(data);
        setFilter({ ...filter, currentLength: 10 });
        setPagination({ page: 1, sort: value });
      })
      .finally(() => {
        backToTop();
      });
  }, [id, filter]);

  const handleListIncrement = () => {
    if (reviewList.length === 0 || disable) return;
    if (filter.currentLength + 10 >= reviewList.length) {
      getReviewList(id, pagination, true)
        .then(({ data }) => {
          if (reviewList.length === [...reviewList, ...data].length) {
            return setDisable(true);
          }
          setReviewList([...reviewList, ...data]);
          setPagination({ ...pagination, page: pagination.page + 1 });
        })
        .catch((err) => {
          console.log(err);
          return setDisable(true);
        });
    }
    setFilter({ ...filter, currentLength: filter.currentLength + 10 });
  };

  useEffect(() => {
    if (!id) return;
    setDisable(false);
    getReviewList(id, { page: 1, sort: 'relevant' })
      .then(({ data }) => {
        setReviewList(data);
      })
      .finally(() => {
        backToTop();
      });
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'scroll';
  }, [modal]);

  return (
    <section id='ratings-reviews' className='ratings-reviews-wrapper'>
      <h1 className='ratings-reviews-title'>Ratings & Reviews</h1>
      <div className='ratings-reviews-container'>
        <RatingBreakdown data={metaData} handleStarFilter={handleStarFilter} />
        <ReviewsList
          reviewList={activeList}
          handleListIncrement={handleListIncrement}
          setModal={setModal}
          setSort={handleSort}
          disable={disable}
          ref={activeListRef}
        />
        {modal
            && (
            <ModalOverlay>
              <AddReviewForm data={metaData} setModal={setModal} />
            </ModalOverlay>
            )}
      </div>
    </section>
  );
};

export default RatingsReviews;
