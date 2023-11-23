import React from 'react';

const FitForm = ({ setCharacterstic }) => {
  return (
    <div onChange={(e) => setCharacterstic('Fit', e.target.value)}>
      <p>Fit</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='fit-1' name='fit' type='radio' value={1} />
          <label htmlFor='fit-1'>Too tight</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='fit-2' name='fit' type='radio' value={2} />
          <label htmlFor='fit-2'>Slightly tight</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='fit-3' name='fit' type='radio' value={3} />
          <label htmlFor='fit-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='fit-4' name='fit' type='radio' value={4} />
          <label htmlFor='fit-4'>Slightly big</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='fit-5' name='fit' type='radio' value={5} />
          <label htmlFor='fit-5'>Too big</label>
        </div>
      </div>
    </div>
  )
}

export default FitForm;
