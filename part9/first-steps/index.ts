import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    res.status(400).json({ error: "parameters missing" });
  }

  const heightInCm = parseInt(height as string);
  const weightInKg = parseInt(weight as string);

  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightInCm, weightInKg);
  res.json({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post("/exercises", (req, res) => {
  const { target, daily_exercises: dailyExercises } = req.body;

  if (!target || !dailyExercises) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(dailyExercises) || dailyExercises.some(isNaN) || isNaN(target)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExercises as number[], target as number);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
