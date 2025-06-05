import express from "express";
import cors from "cors";
import UserRequestController from "./controllers/UserRequestController";
import EquipmentRequestController from "./controllers/EquipmentRequestController";
import AccessRequestController from "./controllers/AccessRequestController";
import AuthController from "./controllers/AuthController";

const app = express();
const fullpath = "/api";


app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});


app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-type","Authorization"],
    })
);


app.use(express.json());


app.use(fullpath, UserRequestController);
app.use(fullpath, EquipmentRequestController);
app.use(fullpath, AccessRequestController);
app.use(fullpath, AuthController);

export default  app ;

