import React from "react";

const BodyForm = ({ checkValid, setBody }) => (
  <>
    <p>How was your overall experience?</p>
    <textarea
      rows='4'
      minLength='50'
      maxLength='1000'
      placeholder='Why did you like the product or not?'
      onChange={(e) => setBody('body', e.target.value)}
      onBlur={(e) => checkValid(e, 'body')}
    />
  </>
)

export default BodyForm;
