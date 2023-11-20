import React, { useState, useEffect } from 'react';
import SizeForm from './SizeForm.jsx';
import WidthForm from './WidthForm.jsx';
import ComfortForm from './ComfortForm.jsx';
import QualityForm from './QualityForm.jsx';
import LengthForm from './LengthForm.jsx';
import FitForm from './FitForm.jsx';

const AddReviewForm = () => {
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    console.log(userImages)
  }, [userImages])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const convertFilesToDataURL = async(e) => {
    e.preventDefault();
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

        <label>Overall rating: </label>
        <div>Star rating thing</div>

        <p>Would you recommed this product?</p>
        <div className='input-wrapper-row'>
          <label htmlFor='yes-recommend'>Yes</label>
          <input selected id='yes-recommend' name='recommend' type='radio' />
          <label htmlFor='no-recommend'>No</label>
          <input id='no-recommend' name='recommend' type='radio' />
        </div>

        <label htmlFor='summary'>Review Summary</label>
        <input id='summary' type='text' maxLength='60' placeholder='Example: Best Purchase Ever!'/>

        <label htmlFor='review-body'>How was your overall experience?</label>
        <textarea id='review-body' minLength='50' maxLength='1000' placeholder='Why did you like the product or not?' />

        <SizeForm />
        <WidthForm />
        <ComfortForm />
        <QualityForm />
        <LengthForm />
        <FitForm />

        <input type='file' multiple accept="image/png, image/jpeg" onChange={(e) => convertFilesToDataURL(e)} />

        <div className='user-image-wrapper'>
          {userImages &&
            userImages.map((image,index) => {
              return <img key={`userimage-${index}`} src={image} />
            })
          }
        </div>

        <button type='submit'>Submit Review</button>
      </form>
    </div>
  )
}

export default AddReviewForm;