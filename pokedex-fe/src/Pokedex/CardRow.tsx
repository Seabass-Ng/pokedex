import React from 'react';
import { styled } from '@linaria/react';
import { useQuery } from '@apollo/client';
import Card from './Card';
import GET_ALL_POKEMON, { IPokemonList } from '../queries/PokemonListQuery';
import Layout from 'src/Layout';

const StyledCardRow = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
`;

const CardRow = () => {
  const { loading, data } = useQuery<IPokemonList>(GET_ALL_POKEMON);
  let innerEl;
  if ((data?.pokemons?.length || 0) > 0) {
    const pokemons = data?.pokemons || [];
    innerEl = (
      <StyledCardRow>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} {...pokemon} />
        ))}
      </StyledCardRow>
    );
  } else if (loading) {
    innerEl = 'Loading...'; // TODO: Better Loading
  } else {
    innerEl = 'Sorry, no pokemon in pokedex';
  }
  return <Layout>{innerEl}</Layout>;
};

export default CardRow;
