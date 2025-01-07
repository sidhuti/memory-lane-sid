import React from "react";
import { Modal, Button } from "react-bootstrap";

function DynamicModal({ show, handleClose, modalTitle, content, handleSave } : {
  show: boolean,
  handleClose: any,
  modalTitle: string,
  content: any,
  handleSave: any
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DynamicModal;
