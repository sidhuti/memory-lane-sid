import React, { useState } from "react";
import Header from '../components/Header';
import MemoryList from '../components/MemoryList';
import NewMemoryButton from '../components/NewMemoryButton';
import AddMemoryModal from "../components/AddMemoryModal";
import Dropdown from '../components/Dropdown';

const MemoryLane = () => {

  const [showModal, setShowModal] = useState(false);

  const addMemory = (newMemory) => {
    console.log(newMemory);
  };

  console.log(showModal);

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
