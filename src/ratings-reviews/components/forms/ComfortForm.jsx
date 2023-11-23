import React, { memo } from 'react';

const ComfortForm = ({ setCharacterstic }) => {
  return (
    <div onChange={(e) => setCharacterstic('Comfort', e.target.value)}>
      <p>Comfort</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='comfort-1' name='comfort' type='radio' value={1}/>
          <label htmlFor='comfort-1'>Uncomfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-2' name='comfort' type='radio' value={2} />
          <label htmlFor='comfort-2'>Slightly uncomfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-3' name='comfort' type='radio' value={3} />
          <label htmlFor='comfort-3'>Ok</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-4' name='comfort' type='radio' value={4} />
          <label htmlFor='comfort-4'>Comfortable</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='comfort-5' name='comfort' type='radio' value={5} />
          <label htmlFor='comfort-5'>Perfect</label>
        </div>
      </div>
    </div>
  )
}

export default memo(ComfortForm);