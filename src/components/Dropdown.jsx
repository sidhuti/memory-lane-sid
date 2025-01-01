import styled from 'styled-components';
import { fetchMemories } from '../api/api';
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';


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
  const { dispatch } = useContext(AppContext);

  const handleChange = async (option) => {
    const data = await fetchMemories(option.target.value);
    dispatch({ type: 'FETCH_SUCCESS', payload: data.memories });
  }

  
  return <DropdownContainer>
    <Select onChange={(option) => handleChange(option)}>
    <option value="ASC">
      Older to Newer
    </option>
      
    <option value="DESC">
      Newer to Older
    </option>
    </Select>
  </DropdownContainer>
};

export default Dropdown;
