import { useQuery } from '@apollo/client';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'src/Layout';
import PokemonQuery from 'src/queries/PokemonQuery';

const PokemonGrid = styled.div`
  background-color: lightgreen;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
  margin: 20px auto 0;
  padding: 20px;
  width: 300px;
  @media screen and (max-width: 300px) {
    width: 100%;
  }

  > * {
    padding: 10px;
  }

  img {
    max-width: 100%;
  }
`;

const DataCell = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  color: black;
`;

const ValueDataCell = styled(DataCell)`
  background-color: white;
`;

const rowSpan2 = css`
  grid-column: span 2;
`;

const DataCellHeader = styled(ValueDataCell)`
  font-weight: 700;
`;

const Pokemon: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PokemonQuery, {
    variables: { id: Number(id) },
  });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>An error has occurred</>;
  }
  const { pokemon } = data;
  return (
    <Layout>
      <PokemonGrid>
        <DataCellHeader>{pokemon.name}</DataCellHeader>
        <DataCellHeader>{`#${`00${pokemon.id}`.slice(-3)}`}</DataCellHeader>
        <ValueDataCell className={rowSpan2}>
          <img alt={pokemon.name} src={pokemon.imageUrl} />
        </ValueDataCell>
        <ValueDataCell className={rowSpan2}>
          {pokemon.type1.name} {pokemon.type2.name}
        </ValueDataCell>
        <ValueDataCell className={rowSpan2}>
          {pokemon.description}
        </ValueDataCell>
      </PokemonGrid>
    </Layout>
  );
};

export default Pokemon;
