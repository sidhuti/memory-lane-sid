import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FiX } from "react-icons/fi";

function SnackBar({ error, onClose }) {
    return (
        <ToastContainer position="top-end" className="p-3">
          <Toast 
            show={!!error} 
            onClose={onClose} 
            delay={3000} 
            autohide 
            bg="danger"
          >
            <Toast.Header closeButton>
              <strong className="me-auto text-white">Error</strong>
              <FiX className="text-white" onClick={onClose} />
            </Toast.Header>
            <Toast.Body className="text-white">{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      );
}

export default SnackBar;