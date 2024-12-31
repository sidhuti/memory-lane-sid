import styled from 'styled-components';

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

const NewMemoryButton = () => <Button>+ New Memory</Button>;

export default NewMemoryButton;
