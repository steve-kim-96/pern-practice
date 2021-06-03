import "reflect-metadata";
import express from "express";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
// import path from "path";
import { Post } from "./entities/Post";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5432/pern",
    logging: true,
    synchronize: true,
    entities: [Post],
  });

  const app = express();
  const port = process.env.PORT;
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
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
