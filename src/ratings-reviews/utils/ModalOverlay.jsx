import React from 'react';
import './utilStyles.css';

const ModalOverlay = ({ children }) => {
  return (
    <div className='modal-background'>
      {children}
    </div>
  )
}

export default ModalOverlay;