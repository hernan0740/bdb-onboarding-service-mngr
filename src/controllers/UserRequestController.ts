import {
  createUser,
  getAllUsersWithEstados,
  getUser,
  getUserAll,
  getUserWithSolicitudes,
} from "../services/userService";
import { Router, Request, Response } from "express";
import { sendNotification } from "../services/notificationServices";

const UserRequestController = Router();

UserRequestController.post(
  "/user/request",
  async (req: Request, res: Response) => {
    try {
      console.log("llego al body 1", req.body);
      const userCreateRes = await createUser(req.body);
      if (userCreateRes.status === 200) {
        const notificationApi = sendNotification(req.body);
        console.log("Send notification", notificationApi);
      }
      res.status(201).send(userCreateRes);
    } catch (error) {
      console.error("Error en addEmployee:", error);
      res.status(500).send("Error al crear empleado");
    }
  },
);

UserRequestController.get(
  "/user/request/:documento_identidad",
  async (req: Request, res: Response) => {
    try {
      console.log("llego a consulta usuario ");
      const { documento_identidad } = req.params;
      const userGetRes = await getUserWithSolicitudes(documento_identidad);

      if (!userGetRes || userGetRes.length === 0) {
        res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(userGetRes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
);

UserRequestController.get(
  "/user/request",
  async (req: Request, res: Response) => {
    try {
      console.log("llego a consulta de usuarios ");
      const userGetRes = await getAllUsersWithEstados();

      if (!userGetRes || userGetRes.length === 0) {
        res.status(404).send({ error: "Users not found" });
      }
      res.status(200).send(userGetRes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
);

export default UserRequestController;
