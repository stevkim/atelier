import React, { memo } from 'react';

const WidthForm = ({ setCharacteristic }) => (
  <div onChange={(e) => setCharacteristic('Width', e.target.value)}>
    <p>Width</p>
    <div className='product-input-wrapper'>
      <label htmlFor='width-1'>
        <input id='width-1' name='width' type='radio' value={1} />
        Too narrow
      </label>
      <label htmlFor='width-2'>
        <input id='width-2' name='width' type='radio' value={2} />
        Slightly narrow
      </label>
      <label htmlFor='width-3'>
        <input id='width-3' name='width' type='radio' value={3} />
        Perfect
      </label>
      <label htmlFor='width-4'>
        <input id='width-4' name='width' type='radio' value={4} />
        Slightly wide
      </label>
      <label htmlFor='width-5'>
        <input id='width-5' name='width' type='radio' value={5} />
        Too wide
      </label>
    </div>
  </div>
);

export default memo(WidthForm);
