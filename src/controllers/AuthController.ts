import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const SECRET = "tu_clave_secreta_super_segura";

interface User {
  username: string;
  password: string;
  role: string;
}

const users: User[] = [
  { username: "lider", password: "123", role: "lider" },
  { username: "dev", password: "123", role: "dev" },
];

router.post("/login", (req: Request, res: Response) => {
  console.log("llego al back", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username y password son requeridos" });
  }
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET,
      {
        expiresIn: "3h",
      },
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

export default router;
