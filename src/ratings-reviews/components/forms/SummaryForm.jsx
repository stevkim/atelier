import React from 'react';

const SummaryForm = ({ checkValid, setSummary }) => (
  <>
    <p>Review Summary</p>
    <input
      type='text'
      maxLength='60'
      placeholder='Example: Best Purchase Ever!'
      onChange={(e) => setSummary('summary', e.target.value)}
      onBlur={(e) => checkValid(e, 'summary')}
    />
  </>
);

export default SummaryForm;
