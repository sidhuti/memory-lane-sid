import { BASE_URL } from "../constants/constants";

export const fetchMemories = async (sort) => {
  const response = await fetch(
    sort ?
    `${BASE_URL}/memories?sort=${sort}`
    : `${BASE_URL}/memories`
    );
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }
  return response.json();
};

export const fetchUser = async (email) => {
  const response = await fetch(`${BASE_URL}/user?email=${email}`, { method: 'GET' });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
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
    const apiResponse = await response.json();
    throw new Error(apiResponse.error);
  }
  return await response.json();
};

export const updateMemory = async (id, memory) => {
  const response = await fetch(`${BASE_URL}/memories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
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
    const errorData = await response.json();
    return errorData;
  }

  return response.json();
} 



export const deleteMemory = async (id) => {
  const response = await fetch(`${BASE_URL}/memories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }
  return response.json();
};
