import React, { useState, useContext } from "react";
import Header from '../components/Header';
import MemoryList from '../components/MemoryList';
import NewMemoryButton from '../components/NewMemoryButton';
import DynamicModal from "../components/DynamicModal";
import Dropdown from '../components/Dropdown';
import { AppContext } from "../context/AppContext";
import { createMemory } from "../api/api";
import { Modal, Button, Form } from "react-bootstrap";

const MemoryLane = () => {

  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [memory, setMemory] = useState({ name: "", description: "", image: "", timestamp: "" });

  const { dispatch } = useContext(AppContext);

  const addMemory = async (newMemory) => {
    await createMemory(newMemory);
    dispatch({ type: 'POST_SUCCESS', payload: [newMemory]})
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value  });
  };

  const handleSave = () => {
    addMemory(memory);
    setShowModal(false);
  };


  return <div>
    <Header />
    <Dropdown />
    <MemoryList />
    <NewMemoryButton onClick={() => { setShowMemoryModal(true)}}/>
    <DynamicModal
        show={showMemoryModal}
        modalTitle="Add New Memory"
        handleClose={() => setShowMemoryModal(false)}
        content={        <Form>
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
          <Form.Group controlId="memoryTimeStamp" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
             type="date"
             name="timestamp"
             onChange={handleChange}
            >
            </Form.Control>
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
        </Form>}
        handleChange={handleChange}

        handleSave={handleSave}
      />
  </div>
};

export default MemoryLane;
