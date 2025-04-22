import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createEvent, getEvents } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", protectRoute, createEvent);
router.get("/", protectRoute, getEvents);

export default router;
