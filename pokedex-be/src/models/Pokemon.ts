import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Evolution } from "./Evolution";

export const TYPES = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dark',
  'dragon',
  'steel',
  'fairy'
];

@Entity()
@ObjectType()
export class Pokemon extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ nullable: false })
  description: string;

  @Field(() => String)
  @Column({ nullable: false })
  imageUrl: string;

  @Field(() => String)
  @Column({ nullable: true })
  type1: string;

  @Field(() => String)
  @Column({ nullable: true })
  type2: string;
}
