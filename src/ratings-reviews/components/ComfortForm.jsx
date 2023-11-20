import React from 'react';

const ComfortForm = () => {
  return (
    <>
      <p>Comfort</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='comfort-1' name='comfort' type='radio' />
          <label htmlFor='comfort-1'>Uncomfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-2' name='comfort' type='radio' />
          <label htmlFor='comfort-2'>Slightly uncomfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-3' name='comfort' type='radio' />
          <label htmlFor='comfort-3'>Ok</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-4' name='comfort' type='radio' />
          <label htmlFor='comfort-4'>Comfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-5' name='comfort' type='radio' />
          <label htmlFor='comfort-5'>Perfect</label>
        </div>
      </div>
    </>
  )
}

export default ComfortForm;