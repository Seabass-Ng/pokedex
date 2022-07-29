import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity()
@ObjectType()
export class Evolution extends BaseEntity {
    @PrimaryColumn('int')
    @Field()
    @ManyToOne(() => Pokemon, pokemon => pokemon.id, { eager: true })
    evolvee: Pokemon;

    @PrimaryColumn('int')
    @Field()
    @ManyToOne(() => Pokemon, pokemon => pokemon.id, { eager: true })
    evolved: Pokemon;

    @Field()
    @Column({ nullable: false })
    condition: string;
}
