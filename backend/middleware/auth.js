import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido o expirado." });
      }

      req.user = decodedPayload;
      next();
    });
  } else {
    res.status(401).json({ message: "No estás autenticado." });
  }
}
