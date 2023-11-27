import React from 'react';
import './utilStyles.css';

const ModalOverlay = ({ children }) => (
  <div className='modal-background'>
    {children}
  </div>
);

export default ModalOverlay;
