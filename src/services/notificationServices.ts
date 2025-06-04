import { IUser } from "./userService";

export const sendNotification = (req: IUser) => {
  const { documento_identidad, nombre, correo, area } = req;
  const url = "";
  const method = "POST";
  const bodyData = {
    nombre,
    documento_identidad,
    correo,
    area,
    fecha: new Date(),
  };
  return {
    status: "send success notification",
    message: bodyData,
  };
};
