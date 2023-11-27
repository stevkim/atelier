import React, { forwardRef, useState, useMemo, useEffect } from 'react';
import ReviewItem from './ReviewItem.jsx';
import ReviewsHeader from './ReviewsHeader.jsx';
import useThrottle from '../hooks/useThrottle.jsx';

const ReviewsList = forwardRef(({ reviewList, handleListIncrement, setModal, setSort, totalReviews }, ref) => {
  const [filterValue, setFilterValue] = useState('');
  const [scrollButton, setScrollButton] = useState(false);

  const list = useMemo(() => {
    return reviewList.filter(review => {
      if (filterValue.length < 3) return review;
      return review.summary.toLowerCase().includes(filterValue.toLowerCase());
    })
  }, [reviewList, filterValue]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    scrollTop + clientHeight >= 1200 ? setScrollButton(true) : setScrollButton(false);
    if (scrollTop + clientHeight > scrollHeight - 300) {
      handleListIncrement();
    }
  }
  const throttledScroll = useThrottle(handleScroll, 200);

  return (
    <div className='review-list-container'>
      <ReviewsHeader totalReviews={totalReviews} setSort={setSort} setFilter={setFilterValue}/>
      <div className='review-list-wrapper' onScroll={e => throttledScroll(e)} ref={ref} data-testid='review-list'>
        {list.length > 0
          ? <>
              {
                list.map(review => {
                  return <ReviewItem key={review.review_id} review={review} />
                })
              }
            </>
          : <div>Whoops there are no reviews here!</div>
        }
      </div>
      <div className='review-button-wrapper'>
        <div className='add-review-button' onClick={() => setModal(true)}>
          ADD A REVIEW
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em'}}>
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>
        {scrollButton &&
          <span className='back-to-top' onClick={() => ref.current.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5em', height: '1.5em' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </span>
        }
      </div>
    </div>
  )
});

export default ReviewsList;