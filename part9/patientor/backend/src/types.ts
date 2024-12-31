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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface NewPatientEntries extends NewPatient {
  entries: Entry[];
}
export interface Patient extends NewPatientEntries {
  id: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
