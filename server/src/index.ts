import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import express from "express";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5433/pern",
    logging: true,
    synchronize: false,
    entities: [Post],
    migrations: [path.join(__dirname, "./migrations/*")]
  });

  const app = express();
  const port = process.env.PORT;
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
  });

  // creates a graphql endpoint on express
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log("Server started on port 4000");
  });

};

main().catch((error) => {
  console.error(error);
});
