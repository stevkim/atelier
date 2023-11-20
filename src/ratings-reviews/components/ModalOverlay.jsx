import React from 'react';

const ModalOverlay = ({ children }) => {
  return (
    <div className='modal-background'>
      {children}
    </div>
  )
}

export default ModalOverlay;