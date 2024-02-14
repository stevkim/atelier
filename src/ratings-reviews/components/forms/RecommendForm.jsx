import React from 'react'

const RecommendForm = ({ setRecommend }) => (
  <div
    className='input-wrapper-row'
    onChange={(e) => setRecommend('recommend', JSON.parse(e.target.value))}
  >
    <p style={{ marginRight: '.5em' }}>Would you recommend this product?</p>
    <label htmlFor='yes-recommend'>
      Yes
      <input id='yes-recommend' name='recommend' type='radio' value='true' />
    </label>
    <label htmlFor='no-recommend'>
      No
      <input id='no-recommend' name='recommend' type='radio' value='false' />
    </label>
  </div>
)

export default RecommendForm;
