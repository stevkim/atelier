import React, { forwardRef, useState, useMemo } from 'react';
import ReviewItem from './review-item/ReviewItem.jsx';
import ReviewsHeader from './ReviewsHeader.jsx';
import useThrottle from '../hooks/useThrottle.jsx';
import BackToTopButton from './BackToTopButton.jsx';
import AddReviewButton from './forms/AddReviewButton.jsx';

const ReviewsList = ({ reviewList, handleListIncrement, setModal, setSort, disable, scrollToTop }, ref) => {
  const [filterValue, setFilterValue] = useState('');
  const [scrollButton, setScrollButton] = useState(false);

  // Memoized list to automate search filters from user
  const list = useMemo(() => reviewList.filter((review) => {
    if (filterValue.length < 3) return review;
    return review.summary.toLowerCase().includes(filterValue.toLowerCase());
  }), [reviewList, filterValue]);

  // Infinite scroll feature - looks at the current scroll position and increments the list as needed
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    scrollTop + clientHeight >= 1200 ? setScrollButton(true) : setScrollButton(false);
    if (scrollTop + clientHeight > scrollHeight - 300) {
      handleListIncrement();
    }
  };
  // Throttle for the infinite scroll - throttles to 1 invocation every 200ms
  const throttledScroll = useThrottle(handleScroll, 200);

  const listOfReviews = () => {
    if (list.length > 0) {
      return list.map((review) => <ReviewItem key={review.review_id} review={review} />);
    }
    return <>Whoops there are no reviews here!</>;
  };

  return (
    <section className='review-list-container'>
      <ReviewsHeader totalReviews={list.length} setSort={setSort} setFilter={setFilterValue} />
      <div
        className='review-list-wrapper'
        onScroll={disable ? () => {} : (e) => throttledScroll(e)}
        ref={ref}
        data-testid='review-list'
      >
        {listOfReviews()}
        {disable ? <div style={{ margin: '0 auto', width: 'fit-content', padding: '.2em' }}>No more reviews to load!</div> : null}
      </div>
      <div className='review-button-wrapper'>
        <AddReviewButton setModal={setModal} />
        {scrollButton ? <BackToTopButton scrollToTop={scrollToTop} /> : null}
      </div>
    </section>
  );
};

export default forwardRef(ReviewsList);
