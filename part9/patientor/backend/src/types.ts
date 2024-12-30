import { z } from "zod";

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn">;
