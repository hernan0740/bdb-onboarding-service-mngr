import express from "express";
import cors from "cors";
import UserRequestController from "./controllers/UserRequestController";
import EquipmentRequestController from "./controllers/EquipmentRequestController";
import AccessRequestController from "./controllers/AccessRequestController";

const app = express();
const port = 5000;
const fullpath = "/api";

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());

app.use(fullpath, UserRequestController);
app.use(fullpath, EquipmentRequestController);
app.use(fullpath, AccessRequestController);

app.listen(port, "0.0.0.0", () => console.log("Server running"));

export default app;
