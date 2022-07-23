import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePokemonTypeInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  name: string;
}
