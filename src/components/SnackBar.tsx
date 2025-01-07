import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function SnackBar({ errorMessage, onClose }: { errorMessage?: string, onClose: () => void}) {
    return (
        <ToastContainer position="bottom-end" className="p-3">
          <Toast 
            show={!!errorMessage} 
            onClose={onClose} 
            delay={3000} 
            autohide 
            bg="danger"
          >
            <Toast.Header>
              <strong className="me-auto text-black">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{errorMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      );
}

export default SnackBar;