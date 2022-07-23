import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { PokemonResolver } from "./resolvers/PokemonResolver";
import { TypeResolver } from "./resolvers/TypeResolver";

async function main() {
  await createConnection();
  const schema = await buildSchema({ resolvers: [PokemonResolver, TypeResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started on port 4000!");
}

main();
