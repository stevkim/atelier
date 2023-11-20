import React, { useState, useEffect, useCallback } from 'react';
import SizeForm from './SizeForm.jsx';
import WidthForm from './WidthForm.jsx';
import ComfortForm from './ComfortForm.jsx';
import QualityForm from './QualityForm.jsx';
import LengthForm from './LengthForm.jsx';
import FitForm from './FitForm.jsx';
import AddStarRating from './AddStarRating.jsx';
import { convertFilesToDataURL } from '../lib/convertFile.js';
import { postReview } from '../lib/fetchFunctions.js';

const AddReviewForm = ({ id, data, setModal }) => {
  const [userImages, setUserImages] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [errMessages, setErrMessages] = useState([]);
  const [error, setError] = useState(false);

  const invalidMessages = {
    'default': 'Please enter the required fields',
    'email' : 'The email address provided is not in correct email format',
    'images' : 'The images selected are invalid or unable to be uploaded',
    'body': 'The review body must be between 50 and 1000 characters',
    'summary' : 'The review summary must be between 1 than 60 characters'
  };

  const convertImage = useCallback(async(e) => {
    const result = convertFilesToDataURL(e);
    setUserImages(await result)
  }, []);

  const handleCharacterstics = (input, value) => {
    setCharacteristics({...characteristics, [input]: {[data[input].id]: parseInt(value) }})
  }

  const checkValid = (e, type) => {
    if (!e.target.checkValidity() || e.target.value === '') {
      if (errMessages.includes(invalidMessages[type])) return false;
      setErrMessages([...errMessages, invalidMessages[type]]);
      return false;
    } else {
      setErrMessages(errMessages.filter(msg => { return msg !== invalidMessages[type] }));
      return true;
    }
  }

  const checkRequirements = () => {
    let passing = true;
    if (name === '' || summary === '' || email === '' || body === '' || recommend === null || overallRating === 0) {
      if (errMessages.includes(invalidMessages['default'])) return false;
      setErrMessages([...errMessages, invalidMessages['default']]);
      passing = false;
    } else {
      setErrMessages(errMessages.filter(msg => { return msg !== invalidMessages['default'] }));
    }
    return passing;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkRequirements() || errMessages.length > 0) {
      return setError(true);
    };
    const review = {
      product_id: id,
      rating: overallRating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: userImages,
      characteristics: characteristics
    }
    postReview(id, review)
      .then(result => {
        console.log(result);
        setModal(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='add-review-container'>
      <div className='add-review-header'>
        <h1>Write Your Review</h1>
        <span onClick={() => setModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.5em', height: '1.5em' }}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      <h4>About the [name]</h4>
      <form className='add-review-form' onSubmit={(e) => handleSubmit(e)} onChange={() => setError(false)} noValidate>
        <div className='input-wrapper-row'>
          <p htmlFor='username'>Username: </p>
          <input id='username' type='text' placeholder='Example: jackson11!'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <sub style={{ fontSize: '.5em' }}>For privacy reasons, do not use your full name or email address</sub>

        <div className='input-wrapper-row'>
          <p htmlFor='email'>Email: </p>
          <input id='email' type='email' placeholder='Example: jackson11@email.com'
            onChange={(e) => setEmail(e.target.value)}
            onBlur={e => checkValid(e, 'email')}/>
        </div>
        <sub style={{ fontSize: '.5em' }}>For authentication reasons, you will not be emailed</sub>

        <div className='input-wrapper-row'>
          <p>Overall rating: </p>
          <AddStarRating overallRating={overallRating} setOverallRating={setOverallRating} />
        </div>

        <div className='input-wrapper-row' onChange={(e) => setRecommend(JSON.parse(e.target.value))}>
          <p>Would you recommed this product?</p>
          <label htmlFor='yes-recommend'>Yes</label>
          <input id='yes-recommend' name='recommend' type='radio' value={true}/>
          <label htmlFor='no-recommend'>No</label>
          <input id='no-recommend' name='recommend' type='radio' value={false}/>
        </div>

        <p htmlFor='summary'>Review Summary</p>
        <input id='summary' type='text' maxLength='60' placeholder='Example: Best Purchase Ever!'
          onChange={(e) => setSummary(e.target.value)}
          onBlur={e => checkValid(e, 'summary')}
        />

        <p htmlFor='review-body'>How was your overall experience?</p>
        <textarea id='review-body' rows='4' minLength='50' maxLength='1000' placeholder='Why did you like the product or not?'
          onChange={(e) => setBody(e.target.value)}
          onBlur={e => checkValid(e, 'body')}
        />

        {body.length < 50
          ? <div className='body-subtext'>Minimum required characters left: [{50 - body.length}]</div>
          : <div className='body-subtext'>Minimum reached</div>
        }

        {data && data.Size && <SizeForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Width && <WidthForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Comfort && <ComfortForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Quality && <QualityForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Length && <LengthForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Fit && <FitForm handleCharacterstics={handleCharacterstics} />}

        <p>Add Images (optional):</p>
        <input type='file' multiple accept="image/png, image/jpeg"
          onChange={(e) => convertImage(e)}
          onBlur={e => checkValid(e, 'images')}
        />

        <div className='user-image-wrapper'>
          {userImages &&
            userImages.map((image,index) => {
              return <img key={`userimage-${index}`} src={image} />
            })
          }
        </div>

        <button style={{ width: '20%', margin: '0 auto' }} type='submit'>Submit Review</button>

        {error && errMessages.length > 0 &&
          <div className='error-message'>
            You must enter the following:
            <ul>
              {
                errMessages.map(text => <li key={text}>{text}</li>)
              }
            </ul>
          </div>
        }
      </form>
    </div>
  )
}

export default AddReviewForm;