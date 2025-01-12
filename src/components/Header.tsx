import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext, AppContextType } from '../context/AppContext';
import { fetchUser} from '../api/api';
import { USER_EMAIL, User } from '../constants/constants';
import { FiEdit } from 'react-icons/fi';
import { IoShareSocialOutline as Share } from 'react-icons/io5';
import DynamicModal from './DynamicModal';
import { Form } from "react-bootstrap";
import { updateDescription } from '../api/api';


const HeaderContainer = styled.div`
  padding: 16px;
  text-align: center;
`; 

const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
`;

const Description = styled.div`
  font-size: 1rem;
  color: #555;
  display: inline-block;
`;

const IconContainer = styled.div` 
  display: inline-block;
  margin-left: 10px;
  color: #007bff;
  cursor: pointer;
`;


const Header = () => {
  const { dispatch, state } = useContext<AppContextType| undefined>(AppContext) || {};
  const [showModal, setShowModal] = useState(false);
  const { user, loading, error } = state || {};

  const [userDescription, setUserDescription] = useState('');
  
  useEffect(() => {
    const fetchAndDispatch = async () => {
      try {
        // Fetch user
        const data = await fetchUser(USER_EMAIL);
        dispatch?.({ type: 'FETCH_USER_SUCCESS', payload: data.user });
        setUserDescription(data.user.description);
      } catch (error: unknown) {
        console.error('Error fetching user:', error);
        if(error instanceof Error){ 
          dispatch?.({ type: 'API_ERROR', payload: error.message });
        }
      }
    };
  
    fetchAndDispatch();
  }, []);

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (!user || error) {
    return <p>Error loading user: {error?.message}</p>;
  }


  const handleSave = () => {
    try{
      updateDescription(user?.email, userDescription);
      dispatch?.({ type: 'UPDATE_USER_DESCRIPTION', payload: userDescription });
      setShowModal(false);
    } catch(error: unknown) {
      console.error('Error updating user description:', error);
      if (error instanceof Error) {
        dispatch?.({ type: 'API_ERROR', payload: error.message });
      }
    }
  };


  const handleShare = async ({ user } : { user: User}) => {
        await navigator.share({
          title: `${user.first_name} ${user.last_name}'s memory lane`,
          text: `Hey! ${user.first_name} ${user.last_name} wants to share this memory lane with you !!!`,
          url: window.location.href,
        });
  } 


  return <HeaderContainer>
    <Title>{`${user.first_name} ${user.last_name}'s memory lane`}
      <IconContainer>
          <Share size={20} style={{ marginRight: '8px', verticalAlign: 'baseline' }} onClick={() => handleShare({user})}/> 
      </IconContainer>
    </Title>
    <Description>
      {user.description}
      <IconContainer>
        <FiEdit style={{   verticalAlign: 'text-bottom' }}size={20} onClick={() => { setShowModal(true) }}/>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  { const { value } = e.target; setUserDescription(value); }}
              />
           </Form.Group> 
           }
           handleClose={() => setShowModal(false)}
           handleSave={handleSave}
    />
  </HeaderContainer>
};

export default Header;
