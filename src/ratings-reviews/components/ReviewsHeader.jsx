import React, { memo, useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce.jsx';

const ReviewsHeader = ({ totalReviews, setSort, setFilter }) => {
  const [input, setInput] = useState('');
  const value = useDebounce(input, 500);

  useEffect(() => {
    setFilter(value);
  }, [value]);

  return (
    <div className='review-list-header'>
      <label htmlFor='sort-options'>{totalReviews} reviews, sorted by</label>
      <select name='sort-options' className='review-sort-options' onChange={(e) => setSort(e.target.value)}>
        <option value='relevant'>Relevance</option>
        <option value='newest'>Newest</option>
        <option value='helpful'>Most Helpful</option>
      </select>
      <input type='text' placeholder='Search reviews' value={input} onChange={e => setInput(e.target.value)}/>
    </div>
  )
}

export default memo(ReviewsHeader);