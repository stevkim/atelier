import React, { useState, useMemo } from 'react';
import CharacteristicForm from './CharacteristicForm.jsx';
import AddStarRating from '../../utils/AddStarRating.jsx';
import { convertFilesToDataURL, postRequirements } from '../../lib/formUtilityFunctions.js';
import { postReview } from '../../lib/fetchFunctions.js';
import errorMessages from '../../lib/errorMessages.js';
import AddReviewHeader from './AddReviewHeader.jsx';
import AddReviewUserImages from './AddReviewUserImages.jsx';
import AddReviewErrorMessages from './AddReviewErrorMessages.jsx';
import { convertCharacteristics } from '../../lib/utilityFunctions.js';

const AddReviewForm = ({ data, setModal }) => {
  const { product_id, characteristics } = data;
  const [userInput, setUserInput] = useState({
    product_id: JSON.parse(product_id),
    rating: 0,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    characteristics: {},
    photos: [],
  });
  const [errMessages, setErrMessages] = useState([]);
  const [error, setError] = useState(false);

  const relevantCharacteristics = useMemo(() => convertCharacteristics(characteristics), [characteristics]);

  const convertImage = async (e) => {
    try {
      const result = await convertFilesToDataURL(e.target.files);
      setErrMessages(errMessages.filter((msg) => msg !== errorMessages.maxCapacity));
      setUserInput({ ...userInput, photos: result });
    } catch (err) {
      console.log(err);
      setErrMessages([...errMessages, errorMessages.maxCapacity]);
    }
  };

  const setCharacteristic = (input, value) => {
    setUserInput({ ...userInput, characteristics: { ...userInput.characteristics, [input]: parseInt(value, 10) } });
  };

  const setOverallRating = (value) => {
    setUserInput({ ...userInput, rating: value });
  };

  const checkValid = (e, type) => {
    if (!e.target.checkValidity() || e.target.value === '') {
      if (errMessages.includes(errorMessages[type])) return;
      setErrMessages([...errMessages, errorMessages[type]]);
    } else {
      setErrMessages(errMessages.filter((msg) => msg !== errorMessages[type]));
    }
  };

  const checkRequirements = () => {
    if (!postRequirements(userInput)) {
      if (errMessages.includes(errorMessages.default)) return false;
      setErrMessages([...errMessages, errorMessages.default]);
      return false;
    }
    setErrMessages(errMessages.filter((msg) => msg !== errorMessages.default));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkRequirements() || errMessages.length > 0) return setError(true);
    postReview(product_id, userInput)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setModal(false);
      });
  };

  return (
    <div className='add-review-wrapper'>
      <div className='add-review-container'>
        <AddReviewHeader setModal={setModal} />
        <form
          className='add-review-form'
          onSubmit={(e) => handleSubmit(e)}
          onChange={() => setError(false)}
          noValidate
        >
          <div className='input-wrapper-row'>
            <p>Username: </p>
            <input
              type='text'
              placeholder='Example: jackson11!'
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
            />
          </div>
          <sub>For privacy reasons, do not use your full name or email address</sub>

          <div className='input-wrapper-row'>
            <p>Email: </p>
            <input
              type='email'
              placeholder='Example: jackson11@email.com'
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={(e) => checkValid(e, 'email')}
            />
          </div>
          <sub>For authentication reasons, you will not be emailed</sub>

          <div className='input-wrapper-row'>
            <p>Overall rating: </p>
            <AddStarRating rating={userInput.rating} setOverallRating={setOverallRating} />
          </div>

          <div
            className='input-wrapper-row'
            onChange={(e) => setUserInput({ ...userInput, recommend: JSON.parse(e.target.value) })}
          >
            <p style={{ marginRight: '.5em' }}>Would you recommend this product?</p>
            <label htmlFor='yes-recommend'>
              Yes
              <input id='yes-recommend' name='recommend' type='radio' value='true' />
            </label>
            <label htmlFor='no-recommend'>
              No
              <input id='no-recommend' name='recommend' type='radio' value='false' />
            </label>
          </div>

          <p>Review Summary</p>
          <input
            type='text'
            maxLength='60'
            placeholder='Example: Best Purchase Ever!'
            onChange={(e) => setUserInput({ ...userInput, summary: e.target.value })}
            onBlur={(e) => checkValid(e, 'summary')}
          />

          <p>How was your overall experience?</p>
          <textarea
            rows='4'
            minLength='50'
            maxLength='1000'
            placeholder='Why did you like the product or not?'
            onChange={(e) => setUserInput({ ...userInput, body: e.target.value })}
            onBlur={(e) => checkValid(e, 'body')}
          />
          <div className='body-subtext'>
            {userInput.body.length < 50
              ? `Minimum required characters left: [${50 - userInput.body.length}]`
              : 'Minimum reached'}
          </div>

          {
            relevantCharacteristics.map((entry) => (
              <CharacteristicForm
                key={entry.characteristic}
                setCharacteristic={setCharacteristic}
                type={entry.characteristic}
              />
            ))
          }

          <p>Add Images (optional):</p>
          <input
            type='file'
            multiple
            accept='image/png, image/jpeg'
            onChange={(e) => convertImage(e)}
          />
          <AddReviewUserImages photos={userInput.photos} />

          <button className='submit-review-button' type='submit'>Submit Review</button>

          {error && errMessages.length > 0 && <AddReviewErrorMessages messages={errMessages} />}
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
