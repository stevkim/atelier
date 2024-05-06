import React, { useState, useMemo } from 'react';
import CharacteristicForm from './CharacteristicForm.jsx';
import AddStarRating from '../../utils/AddStarRating.jsx';
import { postRequirements } from '../../lib/formUtilityFunctions.js';
import { postReview } from '../../lib/fetchFunctions.js';
import errorMessages from '../../lib/errorMessages.js';
import AddReviewHeader from './AddReviewHeader.jsx';
import AddReviewUserImages from './AddReviewUserImages.jsx';
import AddReviewErrorMessages from './AddReviewErrorMessages.jsx';
import RecommendForm from './RecommendForm.jsx';
import EmailForm from './EmailForm.jsx';
import UsernameForm from './UsernameForm.jsx';
import SummaryForm from './SummaryForm.jsx';
import BodyForm from './BodyForm.jsx';
import ImageForm from './ImageForm.jsx';
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

  const setInput = (type, value) => {
    setUserInput({ ...userInput, [type]: value });
  };

  const setCharacteristic = (input, value) => {
    setUserInput({ ...userInput, characteristics: { ...userInput.characteristics, [input]: parseInt(value, 10) } });
  };

  const setOverallRating = (value) => {
    setUserInput({ ...userInput, rating: value });
  };

  // check validity of the input
  const checkValid = (e, type) => {
    if (!e.target.checkValidity() || e.target.value === '') {
      if (errMessages.includes(errorMessages[type])) return;
      setErrMessages([...errMessages, errorMessages[type]]);
    } else {
      setErrMessages(errMessages.filter((msg) => msg !== errorMessages[type]));
    }
  };

  // check whether all fields have been filled or not
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
          <UsernameForm setUsername={setInput} />
          <EmailForm checkValid={checkValid} setEmail={setInput} />
          <div className='input-wrapper-row'>
            <p>Overall rating: </p>
            <AddStarRating rating={userInput.rating} setOverallRating={setOverallRating} />
          </div>
          <RecommendForm setRecommend={setInput} />
          <SummaryForm checkValid={checkValid} setSummary={setInput} />
          <BodyForm checkValid={checkValid} setBody={setInput} />
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

          <ImageForm setErrors={setErrMessages} setImages={setInput} />
          <AddReviewUserImages photos={userInput.photos} />

          <button className='submit-review-button' type='submit'>Submit Review</button>

          {error && errMessages.length > 0 && <AddReviewErrorMessages messages={errMessages} />}
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
