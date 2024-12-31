import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemoryCard from './MemoryCard';
import { fetchMemories } from '../api/api';
import { PLACE_HOLDER_IMAGE } from '../constants/constants';

const ListContainer = styled.div`
  padding: 16px;
`;

const MemoryList = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(memories);

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const data = await fetchMemories();
        setMemories(data.memories);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, []);

  if (loading) {
    return <p>Loading memories...</p>;
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
