"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv-safe/config");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const apollo_server_express_1 = require("apollo-server-express");
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: "postgres",
        url: "postgresql://postgres:postgres@localhost:5432/pern",
        logging: true,
        synchronize: true,
        entities: [Post_1.Post],
    });
    const app = express_1.default();
    const port = process.env.PORT;
    const apolloServer = new apollo_server_express_1.ApolloServer({});
    app.listen(port, () => {
        console.log("Server started on port 4000");
    });
};
main().catch((error) => {
    console.error(error);
});
//# sourceMappingURL=index.js.map