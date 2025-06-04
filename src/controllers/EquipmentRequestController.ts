import { Request, Response, Router } from "express";
import {
  createDeviceRequest,
  getDeviceRequest,
  getDevicesRequestAll,
} from "../services/equipmentService";
import { getUserAll } from "../services/userService";
import UserRequestController from "./UserRequestController";

const EquipmentRequestController = Router();

EquipmentRequestController.post("/devices/requests", async (req, res) => {
  try {
    console.log("llego a inicio de solicitud equipo ");
    const deviceCreateRes = await createDeviceRequest(req.body);
    res.status(201).json({ message: deviceCreateRes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar equipo" });
  }
});

EquipmentRequestController.get(
  "/devices/requests/:documento_identidad",
  async (req, res) => {
    try {
      console.log("llego a consulta device ");
      const { documento_identidad } = req.params;
      const deviceGetRes = await getDeviceRequest(documento_identidad);

      if (!deviceGetRes || deviceGetRes.length === 0) {
        res.status(404).send({ error: "Request not found" });
      }
      res.status(200).send(deviceGetRes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
);

EquipmentRequestController.get("/devices/requests", async (req, res) => {
  try {
    console.log("llego a consulta de usuarios ");
    const userGetRes = await getDevicesRequestAll();

    if (!userGetRes || userGetRes.length === 0) {
      res.status(404).send({ error: "Request not found" });
    }
    res.status(200).send(userGetRes);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default EquipmentRequestController;
