import React, { forwardRef, useState, useMemo } from 'react';
import ReviewItem from './review-item/ReviewItem.jsx';
import ReviewsHeader from './ReviewsHeader.jsx';
import BackToTopButton from './BackToTopButton.jsx';
import AddReviewButton from './forms/AddReviewButton.jsx';
import NoMoreReviews from './NoMoreReviews.jsx';
import useThrottle from '../hooks/useThrottle.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.jsx';

const ReviewsList = ({ reviewList, handleListIncrement, setModal, setSort, disable, scrollToTop }, ref) => {
  // if true, shows the scroll to top button
  const [scrollButton, setScrollButton] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  // Memoized list to automate search filters from user
  const list = useMemo(() => reviewList.filter((review) => {
    if (filterValue.length < 3) return review;
    return review.summary.toLowerCase().includes(filterValue.toLowerCase());
  }), [reviewList, filterValue]);

  // return jsx of the list of reviews or an error handling fragment
  const listOfReviews = () => {
    if (list.length > 0) {
      return list.map((review) => <ReviewItem key={review.review_id} review={review} />);
    }
    return <>Whoops there are no reviews here!</>;
  };

  // Infinite scroll - expects a React ref, setScroll, increment
  const infiniteScroll = useInfiniteScroll(ref, setScrollButton, handleListIncrement)
  // throttle useScroll to optimize infinite scroll
  const throttledInfiniteScroll = useThrottle(infiniteScroll, 200);

  return (
    <section className='review-list-container'>
      <ReviewsHeader totalReviews={list.length} setSort={setSort} setFilter={setFilterValue} />
      <div
        className='review-list-wrapper'
        onScroll={disable ? null : throttledInfiniteScroll}
        ref={ref}
        data-testid='review-list'
      >
        {listOfReviews()}
        {disable ? <NoMoreReviews /> : null}
      </div>
      <div className='review-button-wrapper'>
        <AddReviewButton setModal={setModal} />
        {scrollButton ? <BackToTopButton scrollToTop={scrollToTop} /> : null}
      </div>
    </section>
  );
};

// forwardRef is to pass reference of list to parent, to scroll back to top from other components
export default forwardRef(ReviewsList);
