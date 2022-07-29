import { InputType, Field } from "type-graphql";

@InputType()
export class CreateEvolutionInput {
    @Field()
    evolveeId: number;

    @Field()
    evolvedId: number;

    @Field()
    condition: string;
}
