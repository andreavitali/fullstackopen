import { NonSensitivePatient, Patient, NewPatient, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const idx = patientsData.findIndex(p => p.id === patientId);
  if (idx === -1) {
    throw Error("Patient not found");
  } else {
    patientsData[idx].entries.push(newEntry);
    return newEntry;
  }
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};
