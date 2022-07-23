import { gql } from '@apollo/client';

export interface IPokemonListItem {
  id: number;
  imageUrl: string;
  name: string;
}

export interface IPokemonList {
  pokemons: IPokemonListItem[];
}

const GET_ALL_POKEMON = gql`
  query Pokemons {
    pokemons {
      id
      imageUrl
      name
    }
  }
`;

export default GET_ALL_POKEMON;
