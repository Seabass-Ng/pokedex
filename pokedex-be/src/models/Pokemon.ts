import { Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Type } from "./Type";

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

  @Field(() => Type)
  @OneToOne(() => Type, { eager: true })
  @JoinColumn()
  type1: Type;

  @Field(() => Type)
  @OneToOne(() => Type, { nullable: true, eager: true })
  @JoinColumn()
  type2: Type;
}
