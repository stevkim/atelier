import React, { memo } from 'react';

const SizeForm = ({ setCharacteristic }) => (
  <div onChange={(e) => setCharacteristic('Size', e.target.value)}>
    <p>Size</p>
    <div className='product-input-wrapper'>
      <label htmlFor='size-1'>
        <input id='size-1' name='size' type='radio' value={1} />
        A size too small
      </label>
      <label htmlFor='size-2'>
        <input id='size-2' name='size' type='radio' value={2} />
        1/2 a size too small
      </label>
      <label htmlFor='size-3'>
        <input id='size-3' name='size' type='radio' value={3} />
        Perfect
      </label>
      <label htmlFor='size-4'>
        <input id='size-4' name='size' type='radio' value={4} />
        1/2 a size too big
      </label>
      <label htmlFor='size-5'>
        <input id='size-5' name='size' type='radio' value={5} />
        A size too big
      </label>
    </div>
  </div>
);

export default memo(SizeForm);
