import styled from 'styled-components';

const HeaderContainer = styled.div`
  padding: 16px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Header = () => (
  <HeaderContainer>
    <Title>Sid's Memory Lane</Title>
    <Description>
      Sid's journey has been a tapestry of curiosity and exploration...
    </Description>
  </HeaderContainer>
);

export default Header;
