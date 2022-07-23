import { gql } from '@apollo/client';

export interface IPokemonItem {
  id: number;
  description: string;
  imageUrl: string;
  name: string;
  type1: {
    name: string;
  };
  type2: {
    name: string;
  };
}

const GET_POKEMON = gql`
  query Pokemon($id: Float!) {
    pokemon(id: $id) {
      id
      description
      imageUrl
      name
      type1 {
        name
      }
      type2 {
        name
      }
    }
  }
`;

export default GET_POKEMON;
