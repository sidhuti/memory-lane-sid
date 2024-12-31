const BASE_URL = 'http://localhost:4001';

export const fetchMemories = async () => {
  const response = await fetch(`${BASE_URL}/memories`);
  if (!response.ok) {
    throw new Error('Failed to fetch memories');
  }
  return response.json();
};

export const createMemory = async (memory) => {
  const response = await fetch(`${BASE_URL}/memories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory),
  });
  if (!response.ok) {
    throw new Error('Failed to create memory');
  }
  return response.json();
};

export const updateMemory = async (id, memory) => {
  const response = await fetch(`${BASE_URL}/memories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory),
  });
  if (!response.ok) {
    throw new Error('Failed to update memory');
  }
  return response.json();
};

export const deleteMemory = async (id) => {
  const response = await fetch(`${BASE_URL}/memories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete memory');
  }
  return response.json();
};
