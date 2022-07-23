import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Type } from "../models/Type";
import { CreatePokemonTypeInput } from "../inputs/CreatePokemonTypeInput";

@Resolver()
export class TypeResolver {
  @Query(() => [Type])
  types() {
    return Type.find();
  }

  @Query(() => Type)
  type(@Arg("id") id: number) {
    return Type.findOne({ where: { id } });
  }

  @Mutation(() => Type)
  async createType(@Arg("data") data: CreatePokemonTypeInput) : Promise<Type> {
    const type = Type.create(data);
    await type.save();
    return type;
  }

}
