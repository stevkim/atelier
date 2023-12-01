import React, { memo } from 'react';

const ComfortForm = ({ setCharacteristic }) => (
  <div onChange={(e) => setCharacteristic('Comfort', e.target.value)}>
    Comfort
    <div className='product-input-wrapper'>
      <label htmlFor='comfort-1'>
        <input id='comfort-1' name='comfort' type='radio' value={1} />
        Uncomfortable
      </label>
      <label htmlFor='comfort-2'>
        <input id='comfort-2' name='comfort' type='radio' value={2} />
        Slightly uncomfortable
      </label>
      <label htmlFor='comfort-3'>
        <input id='comfort-3' name='comfort' type='radio' value={3} />
        Ok
      </label>
      <label htmlFor='comfort-4'>
        <input id='comfort-4' name='comfort' type='radio' value={4} />
        Comfortable
      </label>
      <label htmlFor='comfort-5'>
        <input id='comfort-5' name='comfort' type='radio' value={5} />
        Perfect
      </label>
    </div>
  </div>
);

export default memo(ComfortForm);
