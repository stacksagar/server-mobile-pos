import { Request, Response } from "express";

export default function modelFilter(req: Request, res: Response) {
  const page = Number(req?.query?.page || "1");
  const limit = Number(req?.query?.limit || "10");
  const offset = limit * (page - 1);

  const conditions = {};

  return { page, limit, offset, conditions };
}
