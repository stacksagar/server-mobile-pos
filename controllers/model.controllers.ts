import { NextFunction, Request, Response } from "express";
import { ModelCtor } from "sequelize-typescript";
import error_res from "../utils/error_res";
import modelFilter from "../utils/model.filter";
import { FindOptions } from "sequelize";

export default class ModelControllers {
  model: ModelCtor;
  text: string;

  constructor(model: unknown) {
    this.model = model as ModelCtor;
    this.text = "sagfas";
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.model.create(req.body);
      res.status(200).json(data);
    } catch (error) {
      return error_res(res, error);
    }
  }

  readSingle(req: Request, res: Response, _next: NextFunction) {
    return async (options?: FindOptions) => {
      const id = req?.params?.id;

      const findOptions: FindOptions = {
        ...(options || {}),
        where: { id },
      };

      if (options?.where) {
        findOptions.where = {
          ...findOptions.where,
          ...options.where,
        };
      }

      try {
        const item = await this.model.findOne(findOptions);
        return res.status(200).json(item);
      } catch (error) {
        return error_res(res, error);
      }
    };
  }

  async readAllByPages(req: Request, res: Response) {
    const { page, limit, offset } = modelFilter(req, res);

    try {
      const data = await this.model.findAndCountAll({
        limit,
        offset,
      });

      res.json({
        totalPages: Math.ceil(data.count / limit),
        totalItems: data.count,
        currentPage: page,
        items: data.rows,
        limit,
      });
    } catch (error) {
      return error_res(res, error);
    }
  }

  readAll(req: Request, res: Response, _next: NextFunction) {
    return async (options?: FindOptions) => {
      try {
        const data = await this.model.findAll({
          ...(options || {}),
        });
        res.status(200).json(data);
      } catch (error) {
        return error_res(res, error);
      }
    };
  }

  async update(req: Request, res: Response) {
    const id = req.params?.id;
    try {
      await this.model.update(req.body, {
        where: { id },
      });
      const updatedData = await this.model.findOne({ where: { id } });
      res.status(200).json(updatedData);
    } catch (error) {
      return error_res(res, error);
    }
  }

  async deleteSingle(req: Request, res: Response) {
    const id = req?.params?.id;
    try {
      this.model.destroy({ where: { id } });
      res.status(200).json({ message: "item deleted!" });
    } catch (error) {
      return error_res(res, error);
    }
  }

  async deleteMultiples(req: Request, res: Response) {
    const ids: number[] = req.body?.ids || [];

    try {
      if (ids?.length < 1) return res.json({ message: "Not Found" });
      await this.model.destroy({ where: { id: ids } });
      res.status(204).json({ message: "items deleted!" });
    } catch (error) {
      return error_res(res, error);
    }
  }
}
