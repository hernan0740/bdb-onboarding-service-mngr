import { Router } from "express";
import {
  createAccessRequest,
  getAccessRequest,
} from "../services/accesService";

const AccessRequestController = Router();

AccessRequestController.get(
  "/access/requests/:documento_identidad",
  async (req, res) => {
    try {
      console.log("llego a consulta accesos ");
      const { documento_identidad } = req.params;
      const deviceGetRes = await getAccessRequest(documento_identidad);

      if (!deviceGetRes || deviceGetRes.length === 0) {
        res.status(404).send({ error: "Request not found" });
      }
      res.status(200).send(deviceGetRes);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
);

AccessRequestController.post("/access/requests", async (req, res) => {
  try {
    console.log("llego a inicio de solicitud equipo ");
    const accessCreateRes = await createAccessRequest(req.body);
    res
      .status(accessCreateRes.status)
      .json({ message: accessCreateRes.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default AccessRequestController;
