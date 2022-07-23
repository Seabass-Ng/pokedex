import { InputType, Field } from "type-graphql";
import { Type } from "../models/Type";

@InputType()
export class UpdatePokemonInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field(() => String, { nullable: true })
  type1: string;

  @Field(() => String, { nullable: true })
  type2: string;
}
