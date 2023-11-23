"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import cors from "cors";
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// const whitelist = ["http://localhost:3001", "http://example2.com"];
// let corsOptionsDelegate = function (req: any, callback: any) {
//   let corsOptions: any;
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
app.use(express_1.default.json());
// app.use(cors(corsOptionsDelegate));
app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up :)",
    });
});
app.get("/test", (req, res) => {
    res.status(200).json({
        message: "test page",
    });
});
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
