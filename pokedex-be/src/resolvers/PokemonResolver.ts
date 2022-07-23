import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Pokemon } from "../models/Pokemon";
import { Type } from '../models/Type';
import { CreatePokemonInput } from "../inputs/CreatePokemonInput";
import { UpdatePokemonInput } from "../inputs/UpdatePokemonInput";
import { getConnection } from "typeorm";

@Resolver()
export class PokemonResolver {
  @Query(() => [Pokemon])
  async pokemons() {
    const connection = getConnection();
    const pokemons = await connection
      .getRepository(Pokemon)
      .createQueryBuilder('pokemon')
      .leftJoinAndSelect('pokemon.type1', 'type1')
      .leftJoinAndSelect('pokemon.type2', 'type2')
      .getMany();
    return pokemons;
  }

  @Query(() => Pokemon)
  async pokemon(@Arg("id") id: number) {
    const connection = getConnection();
    const pokemon = await connection
      .getRepository(Pokemon)
      .createQueryBuilder('pokemon')
      .leftJoinAndSelect('pokemon.type1', 'type1')
      .leftJoinAndSelect('pokemon.type2', 'type2')
      .where('pokemon.id = :id', { id })
      .getOne();
    return pokemon;
  }

  @Mutation(() => Pokemon)
  async createPokemon(@Arg("data") data: CreatePokemonInput) : Promise<Pokemon> {
    const type1: Type | undefined = await Type.findOne({ where: { name: data.type1 } });
    const type2: Type | undefined = await Type.findOne({ where: { name: data.type2 } });
    const pokemon = Pokemon.create({
      ...data,
      type1,
      type2,
    });

    await pokemon.save();
    return pokemon;
  }

  @Mutation(() => Pokemon)
  async updatePokemon(@Arg("id") id: number, @Arg("data") data: UpdatePokemonInput): Promise<Pokemon> {
    let pokemon = await Pokemon.findOne({ where: { id } });
    if (!pokemon) throw new Error("Pokemon not found!");

    const type1: Type | undefined = await Type.findOne({ where: { name: data.type1 } });
    const type2: Type | undefined = await Type.findOne({ where: { name: data.type2 } });
    Object.assign(pokemon, data);
    if (type1) {
      pokemon.type1 = type1;
    }
    if (type2) {
      pokemon.type2 = type2;
    }
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
