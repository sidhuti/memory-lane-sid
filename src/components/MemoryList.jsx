import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import MemoryCard from './MemoryCard';
import { fetchMemories } from '../api/api';

import { PLACE_HOLDER_IMAGE } from '../constants/constants';
import { AppContext } from '../context/AppContext';

const ListContainer = styled.div`
  padding: 16px;
`;

const MemoryList =  () => {
  const { dispatch, state } = useContext(AppContext);
  const { memories, loading, error } = state;


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
  
      try {
        const data = await fetchMemories();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.memories });
      } catch (error) {
        console.error('Error fetching memories:', error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
  
    fetchData();
  }, []);



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
