import express, { Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnose[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
