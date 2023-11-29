import React, { memo } from 'react';

const QualityForm = ({ setCharacteristic }) => (
  <div onChange={(e) => setCharacteristic('Quality', e.target.value)}>
    <p>Quality</p>
    <div className='product-input-wrapper'>
      <label htmlFor='quality-1'>
        <input id='quality-1' name='quality' type='radio' value={1} />
        Poor
      </label>
      <label htmlFor='quality-2'>
        <input id='quality-2' name='quality' type='radio' value={2} />
        Below average
      </label>
      <label htmlFor='quality-3'>
        <input id='quality-3' name='quality' type='radio' value={3} />
        What I expected
      </label>
      <label htmlFor='quality-4'>
        <input id='quality-4' name='quality' type='radio' value={4} />
        Pretty great
      </label>
      <label htmlFor='quality-5'>
        <input id='quality-5' name='quality' type='radio' value={5} />
        Perfect
      </label>
    </div>
  </div>
);

export default memo(QualityForm);
