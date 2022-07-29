import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Pokemon, TYPES } from "../models/Pokemon";
import { CreatePokemonInput } from "../inputs/CreatePokemonInput";
import { UpdatePokemonInput } from "../inputs/UpdatePokemonInput";

@Resolver()
export class PokemonResolver {
  @Query(() => [Pokemon])
  async getPokemons() {
    let pokemons = await Pokemon.find();
    return pokemons;
  }

  @Query(() => Pokemon)
  async getPokemon(@Arg("id") id: number) {
    let pokemon = await Pokemon.findOne({ where: { id } });
    return pokemon;
  }

  @Mutation(() => Pokemon)
  async createPokemon(@Arg("data") data: CreatePokemonInput): Promise<Pokemon> {
    if (TYPES.filter(type => type === data.type1).length === 0) {
      throw new Error(`Type ${data.type1} not found`);
    }
    if (TYPES.filter(type => type === data.type2).length === 0) {
      throw new Error(`Type ${data.type2} not found`);
    }
    const pokemon = Pokemon.create(data);
    await pokemon.save();
    return pokemon;
  }

  @Mutation(() => Pokemon)
  async updatePokemon(@Arg("id") id: number, @Arg("data") data: UpdatePokemonInput): Promise<Pokemon> {
    if (data.type1 && TYPES.filter(type => type === data.type1).length === 0) {
      throw new Error(`Type ${data.type1} not found`);
    }
    if (data.type2 && TYPES.filter(type => type === data.type2).length === 0) {
      throw new Error(`Type ${data.type2} not found`);
    }
    let pokemon = await Pokemon.findOne({ where: { id } });
    if (!pokemon) throw new Error("Pokemon not found!");
    Object.assign(pokemon, data);
    await pokemon.save();
    return pokemon;
  }

  @Mutation(() => Boolean)
  async deletePokemon(@Arg("id") id: number) {
    const pokemon = await Pokemon.findOne({ where: { id } });
    if (!pokemon) throw new Error("Pokemon not found!");
    await pokemon.remove();
    return true;
  }
}
