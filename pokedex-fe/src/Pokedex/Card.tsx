import React from 'react';
import { styled } from '@linaria/react';
import { IPokemonListItem } from '../queries/PokemonListQuery';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  align-items: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  width: 300px;
  h2 {
    font-size: 16px;
  }
  img {
    padding: 6px;
    width: calc(100% - 12px);
  }
`;

const Card: React.FC<IPokemonListItem> = ({ id, imageUrl, name }) => {
  return (
    <CardContainer key={id}>
      <h2>{name}</h2>
      <Link to={`/pokemon/${id}`}>
        <img src={imageUrl} alt="Bulbasaur" />
      </Link>
    </CardContainer>
  );
};

export default Card;
