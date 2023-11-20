import React from 'react';

const WidthForm = () => {
  return (
    <>
      <p>Width</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='width-1' name='width' type='radio' />
          <label htmlFor='width-1'>Too narrow</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-2' name='width' type='radio' />
          <label htmlFor='width-2'>Slightly narrow</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-3' name='width' type='radio' />
          <label htmlFor='width-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-4' name='width' type='radio' />
          <label htmlFor='width-4'>Slightly wide</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='width-5' name='width' type='radio' />
          <label htmlFor='width-5'>Too wide</label>
        </div>
      </div>
    </>
  )
}

export default WidthForm;

