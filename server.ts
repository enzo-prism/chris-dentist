import express from "express";
import { configureBaseApp, prepareApp } from "./server/app";

const app = express();
configureBaseApp(app);
await prepareApp(app);

export default app;
