import { Router } from "express";
import {
  createDeviceRequest,
  getDeviceRequest,
} from "../services/equipmentService";

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

export default EquipmentRequestController;
