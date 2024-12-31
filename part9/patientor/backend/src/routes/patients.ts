import express, { Response, NextFunction, Request } from "express";
import patientService from "../services/patientsService";
import { NonSensitivePatient, NewPatientSchema } from "../types";
import { z } from "zod";
import { toNewEntry } from "../utils";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/:id", (req, res) => {
  const foundPatient = patientService.getPatientById(req.params.id);
  if (!foundPatient) {
    res.status(404).json({ error: "Patient not found" });
  }
  res.json(foundPatient);
});

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", newPatientParser, (req, res) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
});

router.use(errorMiddleware);

export default router;
