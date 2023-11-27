import React from 'react';

export default function Modal({ children }) {
  return (
    <div className="qa-modal-background">
      {children}
    </div>
  );
}
