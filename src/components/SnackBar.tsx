import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function SnackBar({ error, onClose }: { error: any, onClose: any}) {
    return (
        <ToastContainer position="bottom-end" className="p-3">
          <Toast 
            show={!!error} 
            onClose={onClose} 
            delay={3000} 
            autohide 
            bg="danger"
          >
            <Toast.Header>
              <strong className="me-auto text-black">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      );
}

export default SnackBar;