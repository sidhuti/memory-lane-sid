import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddMemoryModal({ show, handleClose, handleSave }) {
  const [memory, setMemory] = useState({ name: "", description: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value });
  };

  const saveMemory = () => {
    handleSave(memory);
    handleClose();
  };

  console.log(show);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Memory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="memoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={memory.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="memoryDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={memory.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="memoryImage" className="mt-3">
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={memory.image}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveMemory}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMemoryModal;
