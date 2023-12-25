import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Page from "../models/Page";
const pageRoutes = express.Router();

const controllers = new ModelControllers(Page);

export default pageRoutes;
