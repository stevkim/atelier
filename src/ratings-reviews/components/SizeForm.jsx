import React from 'react';


const SizeForm = () => {
  return (
    <>
      <p>Size</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='size-1' name='size' type='radio' />
          <label htmlFor='size-1'>A size too small</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='size-2' name='size' type='radio' />
          <label htmlFor='size-2'>1/2 a size too small</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='size-3' name='size' type='radio' />
          <label htmlFor='size-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='size-4' name='size' type='radio' />
          <label htmlFor='size-4'>1/2 a size too big</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='size-5' name='size' type='radio' />
          <label htmlFor='size-5'>A size too big</label>
        </div>
      </div>
    </>
  )
}

export default SizeForm;