import styled from 'styled-components';

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  float: right;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  bottom: 16px;
  right: 16px;
`;

const NewMemoryButton = ({ onClick }) => <Button onClick={onClick}>+ New Memory</Button>;

export default NewMemoryButton;
