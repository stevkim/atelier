import React, { memo } from 'react';

const LengthForm = ({ setCharacterstic }) => {
  return (
    <div onChange={(e) => setCharacterstic('Length', e.target.value)}>
      <p>Length</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='length-1' name='length' type='radio' value={1} />
          <label htmlFor='length-1'>Too short</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-2' name='length' type='radio' value={2} />
          <label htmlFor='length-2'>Slightly short</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-3' name='length' type='radio' value={3} />
          <label htmlFor='length-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-4' name='length' type='radio' value={4} />
          <label htmlFor='length-4'>Slightly long</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-5' name='length' type='radio' value={5} />
          <label htmlFor='length-5'>Too long</label>
        </div>
      </div>
    </div>
  )
}

export default memo(LengthForm);

