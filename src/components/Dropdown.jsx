import styled from 'styled-components';

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

const Dropdown = () => (
  <DropdownContainer>
    <Select>
      <option value="older">Older to new</option>
      <option value="newer">New to older</option>
    </Select>
  </DropdownContainer>
);

export default Dropdown;
