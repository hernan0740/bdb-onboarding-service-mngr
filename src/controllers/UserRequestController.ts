import { createUser, getUser } from "../services/userService";
import { Router, Request, Response } from "express";

const UserRequestController = Router();

UserRequestController.post(
  "/user/request",
  async (req: Request, res: Response) => {
    try {
      console.log("llego al body 1", req.body);
      const userCreateRes = await createUser(req.body);
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
      const userGetRes = await getUser(documento_identidad);

      if (!userGetRes || userGetRes.length === 0) {
        res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(userGetRes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
);

export default UserRequestController;
