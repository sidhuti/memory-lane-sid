import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { fetchUser} from '../api/api';
import { FiEdit } from 'react-icons/fi';

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
  display: inline-block;
`;

const IconContainer = styled.div`
  vertical-align: text-bottom; 
  display: inline-block;
  margin-left: 10px;
  color: #007bff;
  cursor: pointer;
`;


const Header = () => {
  const { dispatch, state } = useContext(AppContext);
  const { user, loading, error } = state;

  
  useEffect(() => {
    const fetchAndDispatch = async () => {
      try {
        // Fetch user
        const data = await fetchUser('jonDoe@test.com');
        console.log(data);
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: data.user });
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
      }
    };
  
    fetchAndDispatch();
  }, []);

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return <p>Error loading user: {error}</p>;
  }



  return <HeaderContainer>
    <Title>{`${user.first_name} ${user.last_name}'s memory lane`}</Title>
    <Description>
      {user.description}
      <IconContainer>
        <FiEdit size={20} />
      </IconContainer>
    </Description>
  </HeaderContainer>
};

export default Header;
