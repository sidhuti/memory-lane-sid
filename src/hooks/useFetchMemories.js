import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext'

import { fetchMemories } from '../api/api'; // API function

export const useFetchMemories = () => {
  const { dispatch } = useContext(AppContext);

  console.log(dispatch);

  useEffect(() => {
    const loadMemories = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const data = await fetchMemories();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.memories });
      } catch (error) {
        console.error('Error fetching memories:', error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    loadMemories();
  }, [dispatch]);
};
