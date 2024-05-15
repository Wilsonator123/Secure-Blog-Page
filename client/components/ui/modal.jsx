import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen }) => {
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
        <div className="m-auto">
          {children}
        </div>
      </div>,
      document.body
    );
  };
  
  export default Modal;