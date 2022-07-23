import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Type extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID!)
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;
}
