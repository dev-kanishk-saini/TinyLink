import express from "express";
import { findByCode, incrementClicks } from "../db/links.js";


const router = express.Router();


// Redirect route: GET /:code
router.get("/:code", async (req, res, next) => {
try {
const { code } = req.params;
// avoid catching API paths such as /api/*
if (code.startsWith("api")) return next();


const link = await findByCode(code);
if (!link) return res.status(404).send("Not found");


await incrementClicks(code);
return res.redirect(302, link.url);
} catch (err) {
console.error(err);
return res.status(500).send("Server error");
}
});


export default router;