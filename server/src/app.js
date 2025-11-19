import express from "express";
import cors from "cors";
import routes from "express";
import linksRouter from "./routes/links.js";
import redirectRouter from "./routes/redirect.js";


const app = express();
app.use(cors());
app.use(express.json());


// API routes
 app.use("/api/links", linksRouter);
 app.use("/healthz", (req, res) => res.json({ ok: true, version: "1.0" }));


// Redirect route must be after API routes so it doesn't catch /api/*
 app.use("/", redirectRouter);


export default app;