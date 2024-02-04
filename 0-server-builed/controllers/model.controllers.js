"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../utils/error_res"));
const model_filter_1 = __importDefault(require("../utils/model.filter"));
class ModelControllers {
    model;
    text;
    constructor(model) {
        this.model = model;
        this.text = "sagfas";
    }
    async create(req, res) {
        try {
            const data = await this.model.create(req.body);
            res.status(200).json(data);
        }
        catch (error) {
            return (0, error_res_1.default)(res, error);
        }
    }
    readSingle(req, res, _next) {
        return async (options) => {
            const id = req?.params?.id;
            const findOptions = {
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
            }
            catch (error) {
                return (0, error_res_1.default)(res, error);
            }
        };
    }
    async readAllByPages(req, res) {
        const { page, limit, offset } = (0, model_filter_1.default)(req, res);
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
        }
        catch (error) {
            return (0, error_res_1.default)(res, error);
        }
    }
    readAll(req, res, _next) {
        return async (options) => {
            console.log("called ");
            try {
                const data = await this.model.findAll({
                    ...(options || {}),
                });
                res.status(200).json(data);
            }
            catch (error) {
                return (0, error_res_1.default)(res, error);
            }
        };
    }
    async update(req, res) {
        const id = req.params?.id;
        try {
            await this.model.update(req.body, {
                where: { id },
            });
            const updatedData = await this.model.findOne({ where: { id } });
            res.status(200).json(updatedData);
        }
        catch (error) {
            return (0, error_res_1.default)(res, error);
        }
    }
    async deleteSingle(req, res) {
        const id = req?.params?.id;
        try {
            this.model.destroy({ where: { id } });
            res.status(200).json({ message: "item deleted!" });
        }
        catch (error) {
            return (0, error_res_1.default)(res, error);
        }
    }
    async deleteMultiples(req, res) {
        const ids = req.body?.ids || [];
        try {
            if (!ids || ids?.length < 1)
                return res.json({ message: "Not Found" });
            await this.model.destroy({ where: { id: ids } });
            res.status(204).json({ message: "items deleted!" });
        }
        catch (error) {
            return (0, error_res_1.default)(res, error);
        }
    }
}
exports.default = ModelControllers;
