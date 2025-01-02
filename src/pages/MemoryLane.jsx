import React, { useState, useContext } from "react";
import Header from '../components/Header';
import MemoryList from '../components/MemoryList';
import NewMemoryButton from '../components/NewMemoryButton';
import AddMemoryModal from "../components/AddMemoryModal";
import Dropdown from '../components/Dropdown';
import { AppContext } from "../context/AppContext";
import { createMemory } from "../api/api";

const MemoryLane = () => {

  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useContext(AppContext);

  const addMemory = async (newMemory) => {
    await createMemory(newMemory);
    dispatch({ type: 'POST_SUCCESS', payload: [newMemory]})
  };


  return <div>
    <Header />
    <Dropdown />
    <MemoryList />
    <NewMemoryButton onClick={() => { setShowModal(true)}}/>
    <AddMemoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={addMemory}
      />
  </div>
};

export default MemoryLane;
