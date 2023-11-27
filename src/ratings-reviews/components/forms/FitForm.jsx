import React, { memo } from 'react';

const FitForm = ({ setCharacterstic }) => (
  <div onChange={(e) => setCharacterstic('Fit', e.target.value)}>
    <p>Fit</p>
    <div className='product-input-wrapper'>
      <label htmlFor='fit-1'>
        <input id='fit-1' name='fit' type='radio' value={1} />
        Too tight
      </label>
      <label htmlFor='fit-2'>
        <input id='fit-2' name='fit' type='radio' value={2} />
        Slightly tight
      </label>
      <label htmlFor='fit-3'>
        <input id='fit-3' name='fit' type='radio' value={3} />
        Perfect
      </label>
      <label htmlFor='fit-4'>
        <input id='fit-4' name='fit' type='radio' value={4} />
        Slightly big
      </label>
      <label htmlFor='fit-5'>
        <input id='fit-5' name='fit' type='radio' value={5} />
        Too big
      </label>
    </div>
  </div>
);

export default memo(FitForm);
