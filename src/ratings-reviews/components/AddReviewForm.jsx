import React, { useState, useCallback } from 'react';
import SizeForm from './forms/SizeForm.jsx';
import WidthForm from './forms/WidthForm.jsx';
import ComfortForm from './forms/ComfortForm.jsx';
import QualityForm from './forms/QualityForm.jsx';
import LengthForm from './forms/LengthForm.jsx';
import FitForm from './forms/FitForm.jsx';
import AddStarRating from '../utils/AddStarRating.jsx';
import { convertFilesToDataURL, postRequirements } from '../lib/addReviewFunctions.js';
import { postReview } from '../lib/fetchFunctions.js';
import errorMessages from '../lib/errorMessages.js';

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

  const convertImage = async (files) => {
    const result = await convertFilesToDataURL(files);
    setUserInput({ ...userInput, photos: result });
  };

  const setCharacterstic = useCallback((input, value) => {
    setUserInput({ ...userInput, characteristics: { ...userInput.characteristics, [characteristics[input].id]: parseInt(value, 10) } });
  }, []);

  const setOverallRating = useCallback((value) => {
    setUserInput({ ...userInput, rating: value });
  }, []);

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
    <div className='add-review-container'>
      <div className='add-review-header'>
        <h1>Write Your Review</h1>
        <button type='button' className='add-review-close-button' onClick={() => setModal(false)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' style={{ width: '1.5em', height: '1.5em' }}>
            <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
          </svg>
        </button>
      </div>
      <h4>About the [name]</h4>
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
          <p style={{ marginRight: '.5em' }}>Would you recommed this product?</p>
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

        {userInput.body.length < 50
          ? (
            <div className='body-subtext'>
              Minimum required characters left: [
              {50 - userInput.body.length}
              ]
            </div>
          )
          : <div className='body-subtext'>Minimum reached</div>}

        {characteristics.Size && <SizeForm setCharacterstic={setCharacterstic} />}
        {characteristics.Width && <WidthForm setCharacterstic={setCharacterstic} />}
        {characteristics.Comfort && <ComfortForm setCharacterstic={setCharacterstic} />}
        {characteristics.Quality && <QualityForm setCharacterstic={setCharacterstic} />}
        {characteristics.Length && <LengthForm setCharacterstic={setCharacterstic} />}
        {characteristics.Fit && <FitForm setCharacterstic={setCharacterstic} />}

        <p>Add Images (optional):</p>
        <input
          type='file'
          multiple
          accept='image/png, image/jpeg'
          onChange={(e) => convertImage(e)}
          onBlur={(e) => checkValid(e, 'images')}
        />

        <div className='user-image-wrapper'>
          {
            userInput.photos.map((image) => <img key={image} src={image} alt='User upload' />)
          }
        </div>

        <div className='submit-review-button'>
          <button type='submit'>Submit Review</button>
        </div>

        {error && errMessages.length > 0
          && (
          <div className='error-message'>
            You must enter the following:
            <ul>
              {
                errMessages.map((text) => <li key={text}>{text}</li>)
              }
            </ul>
          </div>
          )}
      </form>
    </div>
  );
};

export default AddReviewForm;
