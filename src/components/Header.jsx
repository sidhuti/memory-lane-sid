import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { fetchUser} from '../api/api';
import { FiEdit } from 'react-icons/fi';
import DynamicModal from './DynamicModal';
import { Form } from "react-bootstrap";
import { updateDescription } from '../api/api';

const HeaderContainer = styled.div`
  padding: 16px;
  text-align: center;
`; 

const Title = styled.h1`
  font-size: 2rem;
`;

const Description = styled.div`
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
  const [showModal, setShowModal] = useState(false);
  const { user, loading, error } = state;

  const [userDescription, setUserDescription] = useState('');
  
  useEffect(() => {
    const fetchAndDispatch = async () => {
      try {
        // Fetch user
        const data = await fetchUser('jonDoe@test.com');
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: data.user });
        setUserDescription(data.user.description);
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch({ type: 'API_ERROR', payload: error.message });
      }
    };
  
    fetchAndDispatch();
  }, []);

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (!user && error) {
    return <p>Error loading user: {error}</p>;
  }

  const handleSave = () => {
    try{
      updateDescription(user?.email, userDescription);
      dispatch({ type: 'UPDATE_USER_DESCRIPTION', payload: userDescription });
      setShowModal(false);
    } catch(error) {
      console.error('Error updating user description:', error);
      dispatch({ type: 'API_ERROR', payload: error.message });
    }
  };


  return <HeaderContainer>
    <Title>{`${user.first_name} ${user.last_name}'s memory lane`}</Title>
    <Description>
      {user.description}
      <IconContainer>
        <FiEdit size={20} onClick={() => { setShowModal(true) }}/>
      </IconContainer>
    </Description>
    <DynamicModal 
           show={showModal} 
           modalTitle="Edit Description"
           content={      
           <Form.Group controlId="userDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                name="description"
                value={userDescription}
                onChange={(e) =>  { const { value } = e.target; setUserDescription(value); }}
              />
           </Form.Group> 
           }
           handleClose={() => setShowModal(false)}
           handleSave={handleSave}
    />
  </HeaderContainer>
};

export default Header;
