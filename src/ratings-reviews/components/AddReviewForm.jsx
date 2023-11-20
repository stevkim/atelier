import React, { useState, useEffect } from 'react';
import SizeForm from './SizeForm.jsx';
import WidthForm from './WidthForm.jsx';
import ComfortForm from './ComfortForm.jsx';
import QualityForm from './QualityForm.jsx';
import LengthForm from './LengthForm.jsx';
import FitForm from './FitForm.jsx';
import AddStarRating from './AddStarRating.jsx';

const AddReviewForm = ({ data }) => {
  const [userImages, setUserImages] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [characteristics, setCharacteristics] = useState({});

  useEffect(() => {
    console.log(overallRating)
  }, [overallRating])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const convertFilesToDataURL = async(e) => {
    let files = Array.from(e.target.files);
    console.log(files)
    if (files.length > 5) {
      e.target.value = '';
      return alert('Maximum of 5 pictures!');
    }
    const results = await Promise.all(files.map(file => {
      return convertFile(file);
    }));
    setUserImages(results);
  }

  const convertFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(reader.result);
      }
      reader.onerror = function(err) {
        console.log(err)
        reject(err);
      }
    })
  }

  const handleCharacterstics = (input, value) => {
    setCharacteristics({...characteristics, [input]: {[data[input].id]: parseInt(value) }})
  }

  return (
    <div className='add-review-container'>
      <h1>Write Your Review</h1>
      <h4>About the [name]</h4>
      <form className='add-review-form' onSubmit={(e) => handleSubmit(e)}>
        <div className='input-wrapper'>
          <label htmlFor='username'>Nickname: </label>
          <input id='username' type='text' placeholder='Example: jackson11!' />
        </div>
        <sub>For privacy reasons, do not use your full name or email address</sub>

        <div className='input-wrapper'>
          <label htmlFor='email'>Email: </label>
          <input id='email' type='email' placeholder='Exmaple: jackson11@email.com' />
        </div>
        <sub>For authentication reasons, you will not be emailed</sub>

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

        <label htmlFor='summary'>Review Summary</label>
        <input id='summary' type='text' maxLength='60' placeholder='Example: Best Purchase Ever!'/>

        <label htmlFor='review-body'>How was your overall experience?</label>
        <textarea id='review-body' minLength='50' maxLength='1000' placeholder='Why did you like the product or not?' />

        {data && data.Size && <SizeForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Width && <WidthForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Comfort && <ComfortForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Quality && <QualityForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Length && <LengthForm handleCharacterstics={handleCharacterstics} />}
        {data && data.Fit && <FitForm handleCharacterstics={handleCharacterstics} />}

        <input type='file' multiple accept="image/png, image/jpeg" onChange={(e) => convertFilesToDataURL(e)} />

        <div className='user-image-wrapper'>
          {userImages &&
            userImages.map((image,index) => {
              return <img key={`userimage-${index}`} src={image} />
            })
          }
        </div>

        <button style={{ width: '20%' }} type='submit'>Submit Review</button>
      </form>
    </div>
  )
}

export default AddReviewForm;