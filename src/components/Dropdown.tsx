import styled from 'styled-components';
import { fetchMemories } from '../api/api';
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';
import { SORT } from '../constants/constants';


const DropdownContainer = styled.div`
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;



const Dropdown = () => {
  const { dispatch } = useContext<any>(AppContext);

  const handleChange = async (option: React.ChangeEvent<HTMLSelectElement>) => {
    const data = await fetchMemories(option.target.value as SORT);
    dispatch({ type: 'FETCH_MEMORY_SUCCESS', payload: data.memories });
  }

  
  return <DropdownContainer>
    <Select onChange={(option : React.ChangeEvent<HTMLSelectElement>) => handleChange(option)}>
    <option value={SORT.ASC}>
      Older to Newer
    </option>
      
    <option value={SORT.DESC}>
      Newer to Older
    </option>
    </Select>
  </DropdownContainer>
};

export default Dropdown;
