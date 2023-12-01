import React, { memo } from 'react';
import { compareFeatures } from '../lib/utilityFunctions.js';
import '../styles/comparisonStyles.css';
import { v4 as key } from 'uuid';

const Comparison = ({ currentProduct, relatedProduct, setModal }) => (
  <div className='comparison-container'>
    <button type='button' aria-label='Close comparison' className='close-button' onClick={() => { setModal(false); }}>❌</button>
    <h5>Comparing</h5>
    <table>
      <thead>
        <tr>
          <th className='left-header' colSpan='2'>{currentProduct.name}</th>
          <th className='right-header' colSpan='2'>{relatedProduct.name}</th>
        </tr>
      </thead>
      <tbody>
        {compareFeatures(currentProduct.features, relatedProduct.features).map((feature) => (
          <tr key={key()}>
            <td className='value'>{feature[0] === true ? '✔' : ''}</td>
            <td className='feature' colSpan='2'>{feature[1]}</td>
            <td className='value'>{feature[2] === true ? '✔' : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default memo(Comparison);
