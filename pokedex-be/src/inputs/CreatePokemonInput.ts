import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePokemonInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  id: number;

  @Field()
  imageUrl: string;

  @Field()
  type1: string;

  @Field({ nullable: true })
  type2: string;
}
