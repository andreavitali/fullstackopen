import { Diagnose } from "../types";
import diagnosesData from "../../data/diagnoses";

const getDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
};
