import React from 'react';
import FormTemplate from './formTemplate.js';

const CharacteristicForm = ({ setCharacteristic, type }) => (
  <div onChange={(e) => setCharacteristic(type, e.target.value)}>
    {type}
    <div className='product-input-wrapper'>
      <label htmlFor={`${FormTemplate[type].id}-1`}>
        <input
          id={`${FormTemplate[type].id}-1`}
          name={`${FormTemplate[type].id}`}
          type='radio'
          value={1}
        />
        {FormTemplate[type].range[0]}
      </label>
      <label htmlFor={`${FormTemplate[type].id}-2`}>
        <input
          id={`${FormTemplate[type].id}-2`}
          name={`${FormTemplate[type].id}`}
          type='radio'
          value={2}
        />
        {FormTemplate[type].range[1]}
      </label>
      <label htmlFor={`${FormTemplate[type].id}-3`}>
        <input
          id={`${FormTemplate[type].id}-3`}
          name={`${FormTemplate[type].id}`}
          type='radio'
          value={3}
        />
        {FormTemplate[type].range[2]}
      </label>
      <label htmlFor={`${FormTemplate[type].id}-4`}>
        <input
          id={`${FormTemplate[type].id}-4`}
          name={`${FormTemplate[type].id}`}
          type='radio'
          value={4}
        />
        {FormTemplate[type].range[3]}
      </label>
      <label htmlFor={`${FormTemplate[type].id}-5`}>
        <input
          id={`${FormTemplate[type].id}-5`}
          name={`${FormTemplate[type].id}`}
          type='radio'
          value={5}
        />
        {FormTemplate[type].range[4]}
      </label>
    </div>
  </div>
);

export default CharacteristicForm;
