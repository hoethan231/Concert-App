import React, { useEffect } from 'react'
import "./Modal.css"

function Modal({ open, children, onClose }) {

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open && event.target.classList.contains('overlay')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) return null
  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <button onClick={onClose} className="fas fa-times"></button>
        {children}
      </div>
      
    </div>
  )
}

export default Modal
