import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemoryCard from './MemoryCard';
import { useFetchMemories } from '../hooks/useFetchMemories'

import { PLACE_HOLDER_IMAGE } from '../constants/constants';
import { AppContext } from '../context/AppContext';

const ListContainer = styled.div`
  padding: 16px;
`;

const MemoryList =  () => {
  const { state } = useContext(AppContext);
  const { memories, loading, error } = state;

  console.log(memories);

  // Fetch memories when the component mounts
  useFetchMemories();

  if (loading) {
    return <p>Loading memories...</p>;
  }

  if (error) {
    return <p>Error loading memories: {error}</p>;
  }


  return (
    <ListContainer>
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          title={memory.name}
          date={memory.timestamp}
          description={memory.description}
          image={memory.image || PLACE_HOLDER_IMAGE}
        />
      ))}
    </ListContainer>
  );
};

export default MemoryList;
