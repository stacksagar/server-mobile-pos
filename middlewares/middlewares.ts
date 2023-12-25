import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import credentials from "./credentials";
import corsOptions from "./corsOptions.";

const middlewares = [
  morgan("dev"),

  express.static("public"),
  express.static("uploads"),

  credentials,
  corsOptions,

  express.urlencoded({ extended: false }),
  express.json(),

  cookieParser(),
];

export default middlewares;
