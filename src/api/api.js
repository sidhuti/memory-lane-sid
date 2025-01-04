const BASE_URL = 'http://localhost:4001';

export const fetchMemories = async (sort) => {
  const response = await fetch(
    sort ?
    `${BASE_URL}/memories?sort=${sort}`
    : `${BASE_URL}/memories`
    );
  if (!response.ok) {
    throw new Error('Failed to fetch memories');
  }
  return response.json();
};

export const fetchUser = async (email) => {
  const response = await fetch(`${BASE_URL}/user?email=${email}`, { method: 'GET' });
  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

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

export const updateDescription = async (email, description) => {
  const response = await fetch(`${BASE_URL}/user/description/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ description, email })
  });

  if (!response.ok) {
    throw new Error('Failed to update description');
  }

  return response.json();
} 



export const deleteMemory = async (id) => {
  const response = await fetch(`${BASE_URL}/memories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete memory');
  }
  return response.json();
};
