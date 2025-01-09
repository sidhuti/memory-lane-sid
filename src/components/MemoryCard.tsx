import React from "react";
import styled from 'styled-components';
import moment from 'moment'
import { DATE_FORMAT } from "../constants/constants";

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

const DateText = styled.p`
  font-size: 0.8rem;
  color: #777;
`;

const MemoryCard = ({ title, date, description, image } : { title: string, date: string, description:string, image: string}) => {

  return <Card>
    <Image src={image} alt="Memory" />
    <Content>
      <Title>{title}</Title>
      <DateText>{moment(new Date(date)).format(DATE_FORMAT)}</DateText>
      <p>{description}</p>
    </Content>
  </Card>
};

export default MemoryCard;
