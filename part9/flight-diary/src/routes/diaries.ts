import express, { NextFunction, Response, Request } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { z } from "zod";
import { NewEntrySchema } from "../utils";

const router = express.Router();

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
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
  const entry = diaryService.findById(Number(req.params.id));
  if (entry) res.send(entry);
  else res.sendStatus(404);
});

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
