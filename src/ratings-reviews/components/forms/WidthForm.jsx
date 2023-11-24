import React, { memo } from 'react';

const WidthForm = ({ setCharacterstic }) => {
  return (
    <div onChange={(e) => setCharacterstic('Width', e.target.value)}>
      <p>Width</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='width-1' name='width' type='radio' value={1} />
          <label htmlFor='width-1'>Too narrow</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-2' name='width' type='radio' value={2} />
          <label htmlFor='width-2'>Slightly narrow</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-3' name='width' type='radio' value={3} />
          <label htmlFor='width-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-4' name='width' type='radio' value={4} />
          <label htmlFor='width-4'>Slightly wide</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-5' name='width' type='radio' value={5} />
          <label htmlFor='width-5'>Too wide</label>
        </div>
      </div>
    </div>
  )
}

export default memo(WidthForm);

