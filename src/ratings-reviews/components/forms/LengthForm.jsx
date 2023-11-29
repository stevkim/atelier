import React, { memo } from 'react';

const LengthForm = ({ setCharacteristic }) => (
  <div onChange={(e) => setCharacteristic('Length', e.target.value)}>
    <p>Length</p>
    <div className='product-input-wrapper'>
      <label htmlFor='length-1'>
        <input id='length-1' name='length' type='radio' value={1} />
        Too short
      </label>
      <label htmlFor='length-2'>
        <input id='length-2' name='length' type='radio' value={2} />
        Slightly short
      </label>
      <label htmlFor='length-3'>
        <input id='length-3' name='length' type='radio' value={3} />
        Perfect
      </label>
      <label htmlFor='length-4'>
        <input id='length-4' name='length' type='radio' value={4} />
        Slightly long
      </label>
      <label htmlFor='length-5'>
        <input id='length-5' name='length' type='radio' value={5} />
        Too long
      </label>
    </div>
  </div>
);

export default memo(LengthForm);
