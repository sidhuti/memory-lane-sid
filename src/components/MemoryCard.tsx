import React, { useContext } from "react";
import styled from 'styled-components';
import moment from 'moment'
import { FaTrash } from 'react-icons/fa';
import { DATE_FORMAT } from "../constants/constants";
import { deleteMemory } from "../api/api";
import { AppContext, AppContextType } from "../context/AppContext";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  background: #fff;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
`;

const TitleText = styled.div`
  display: inline-flex;
`;

const DateText = styled.p`
  font-size: 0.8rem;
  color: #777;
`;

const TrashIconContainer = styled.div`
  color: red;
  cursor: pointer;
  display: inline-flex;
  float: inline-end;
`



const MemoryCard = ({ id, title, date, description, image } : { id: number, title: string, date: string, description:string, image: string}) => {


  const { dispatch } = useContext<AppContextType| undefined>(AppContext) || {};
  
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try{
        await deleteMemory(id);
        dispatch?.({ type: 'DELETE_MEMORY_SUCCESS', payload: id });
      }catch(error: unknown){
        console.error('Error deleting memory:', error);
        if (error instanceof Error) {
          dispatch?.({ type: 'API_ERROR', payload: error.message });
        }
      }
    }
  
  }


  return <Card>
    <Image src={image} alt="Memory" />
    <Content>
      <Title>
        <TitleText>{title}</TitleText>
        <TrashIconContainer>
            <FaTrash onClick={() => handleDelete(id)} />
        </TrashIconContainer>
      </Title>
      <DateText>{moment(new Date(date)).format(DATE_FORMAT)}</DateText>
      <p>{description}</p>
    </Content>
  </Card>
};

export default MemoryCard;
