import React from "react";
import { convertFilesToDataURL } from "../../lib/formUtilityFunctions";
import errorMessages from "../../lib/errorMessages";

const ImageForm = ({ setErrors, setImages }) => {
  // converts uploaded images to base64 strings and then sets it into state
  const convertImage = async (e) => {
    try {
      const result = await convertFilesToDataURL(e.target.files);
      setErrors(prev => prev.filter((msg) => msg !== errorMessages.maxCapacity));
      setImages('photos', result);
    } catch (err) {
      setErrors(prev => [...prev, errorMessages.maxCapacity]);
    }
  };

  return (
    <>
      <p>Add Images (optional):</p>
      <input
        type='file'
        multiple
        accept='image/png, image/jpeg'
        onChange={(e) => convertImage(e)}
      />
    </>
  )
}

export default ImageForm
