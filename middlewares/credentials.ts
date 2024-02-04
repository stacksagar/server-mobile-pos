import { Request, Response, NextFunction } from "express";
import allowedOrigins from "../config/allowedOrigins";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );
  }

  next();
};

export default credentials;

