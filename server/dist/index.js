"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv-safe/config");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const port = 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        url: "postgresql://postgres:postgres@localhost:5432/pern",
        logging: true,
        synchronize: true,
        entities: [Post_1.Post],
    });
    const app = express_1.default();
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
main().catch((error) => {
    console.error(error);
});
//# sourceMappingURL=index.js.map