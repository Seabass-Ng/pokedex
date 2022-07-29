import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateEvolutionInput } from "../inputs/CreateEvolutionInput";
import { Evolution } from "../models/Evolution";
import { Pokemon } from "../models/Pokemon";

@Resolver()
export class EvolutionResolver {
    @Query(() => [Evolution])
    async getEvolutions() {
        let evolutions = await Evolution.find();
        return evolutions;
    }

    @Query(() => Evolution)
    async getEvolution(@Arg('evolveeId') evolveeId: number, @Arg('evolvedId') evolvedId: number) {
        const connection = getConnection();
        const evolution = connection
            .getRepository(Evolution)
            .createQueryBuilder('evolution')
            .innerJoin('evolution.evolvee', 'evolvee')
            .innerJoin('evolution.evolved', 'evolved')
            .where({ 'evolvee.id': evolveeId, 'evolved.id': evolvedId })
            .getOneOrFail();
        return evolution;
    }

    @Mutation(() => Evolution)
    async createEvolution(@Arg("data") data: CreateEvolutionInput): Promise<Evolution> {
        const evolvee: Pokemon | undefined = await Pokemon.findOne({ where: { id: data.evolveeId } });
        if (evolvee === undefined) {
            throw new Error(`Cannot find pokemon with id ${data.evolveeId}`);
        }
        const evolved: Pokemon | undefined = await Pokemon.findOne({ where: { id: data.evolvedId } });
        if (evolved === undefined) {
            throw new Error(`Cannot find pokemon with id ${data.evolvedId}`);
        }

        const evolution = Evolution.create({
            ...data,
            evolvee,
            evolved,
        });
        await evolution.save();
        return evolution;
    }

    // @Mutation(() => Evolution)
    // async updateEvolutionStatus(
    //     @Arg('evolveeId') evolveeId: number,
    //     @Arg('evolvedId') evolvedId: number,
    //     @Arg('condition') condition: string,
    // ): Promise<Evolution> {
    //     const connection = getConnection();
    //     const evolution = connection
    //         .getRepository(Evolution)
    //         .createQueryBuilder('evolution')
    //         .
    // }
}