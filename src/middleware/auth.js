import jwt from "jsonwebtoken";
import getenv from "../helper/getenv.js";

const JWT_SECRET = getenv("JWT_SECRET");

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "Authorization token required, action failed!" });

    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ message: "Token failed, authorization denied." });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
