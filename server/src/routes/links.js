import express from "express";
import { createLinkHandler, listLinksHandler, getLinkHandler, deleteLinkHandler } from "../controllers/linkcontrollers.js";


const router = express.Router();


router.post("/", createLinkHandler);
router.get("/", listLinksHandler);
router.get("/:code", getLinkHandler);
router.delete("/:code", deleteLinkHandler);


export default router;