"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
app.use(router_1.default);
// now create the api endpoints for handling  databases
// course  creation 
//  folder creation 
//   uploading the videos inside the particular  folder
app.listen(PORT, () => {
    console.log("Server is Listening in PORT " + PORT);
});
