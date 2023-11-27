import React, { memo } from 'react';

const QualityForm = ({ setCharacterstic }) => (
  <div onChange={(e) => setCharacterstic('Quality', e.target.value)}>
    <p>Quality</p>
    <div className="product-input-wrapper">
      <div className="input-wrapper-column">
        <input id="quality-1" name="quality" type="radio" value={1} />
        <label htmlFor="quality-1">Poor</label>
      </div>
      <div className="input-wrapper-column">
        <input id="quality-2" name="quality" type="radio" value={2} />
        <label htmlFor="quality-2">Below average</label>
      </div>
      <div className="input-wrapper-column">
        <input id="quality-3" name="quality" type="radio" value={3} />
        <label htmlFor="quality-3">What I expected</label>
      </div>
      <div className="input-wrapper-column">
        <input id="quality-4" name="quality" type="radio" value={4} />
        <label htmlFor="quality-4">Pretty great</label>
      </div>
      <div className="input-wrapper-column">
        <input id="quality-5" name="quality" type="radio" value={5} />
        <label htmlFor="quality-5">Perfect</label>
      </div>
    </div>
  </div>
);

export default memo(QualityForm);
