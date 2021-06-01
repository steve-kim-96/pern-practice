import "reflect-metadata";
import express from "express";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
// import path from "path";
import { Post } from "./entities/Post";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5432/pern",
    logging: true,
    synchronize: true,
    entities: [Post],
  });

  const app = express();

  app.get("/", (req, res) => {
    res.send("please?");
  });

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

main().catch((error) => {
  console.error(error);
});
