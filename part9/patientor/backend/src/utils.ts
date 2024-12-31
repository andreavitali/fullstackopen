import {
  NewPatientEntries,
  Gender,
  Entry,
  EntryWithoutId,
  Diagnose,
  BaseEntry,
  HealthCheckRating,
  Discharge,
  SickLeave
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (text: string): text is string => {
  return Boolean(Date.parse(text));
};

const isGender = (text: string): text is Gender => {
  return (Object.values(Gender) as string[]).includes(text);
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object" || !("type" in entry) || !(typeof entry.type === "string")) return false;
  return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(entry.type);
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender as Gender;
};

const parseString = (text: unknown, field: string): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing " + field);
  }
  return text;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) throw new Error("Incorrect or missing entries");
  entries.forEach(e => {
    if (!isEntry(e)) throw new Error("Invalid entry");
  });
  return entries as Entry[];
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || typeof healthCheckRating !== "number" || healthCheckRating < 1 || healthCheckRating > 4) {
    throw new Error(`Incorrect Health Rating: ${healthCheckRating}, should be in the range 1 - 4`);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect or missing data");
  }
  const newDischarge: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, "criteria")
  };
  return newDischarge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object" || !("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Incorrect or missing data");
  }
  const newSickLeave: SickLeave = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
  return newSickLeave;
};

//////////////////////////////////////////////////////////////////7

const toNewPatient = (object: unknown): NewPatientEntries => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientEntries = {
      name: parseString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, "occupation"),
      entries: parseEntries(object.entries)
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (
    !object ||
    typeof object !== "object" ||
    !("type" in object) ||
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  let diagnosisCodes;
  if ("diagnosisCodes" in object) {
    diagnosisCodes = parseDiagnosisCodes(object);
  }

  let newBaseEntry: Omit<BaseEntry, "id"> = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: diagnosisCodes
  };

  switch (object.type) {
    case "HealthCheck":
      if ("healthCheckRating" in object) {
        return {
          ...newBaseEntry,
          type: object.type,
          healthCheckRating: parseHealthCheck(object.healthCheckRating)
        };
      } else {
        throw new Error("Incorrect or missing data");
      }
    case "Hospital":
      if ("discharge" in object) {
        return {
          ...newBaseEntry,
          type: object.type,
          discharge: parseDischarge(object.discharge)
        };
      } else {
        return { ...newBaseEntry, type: object.type };
      }
    case "OccupationalHealthcare":
      if ("employerName" in object) {
        if ("sickLeave" in object) {
          return {
            ...newBaseEntry,
            type: object.type,
            employerName: parseString(object.employerName, "employerName"),
            sickLeave: parseSickLeave(object.sickLeave)
          };
        } else {
          return { ...newBaseEntry, type: object.type, employerName: parseString(object.employerName, "employerName") };
        }
      } else {
        throw new Error("Incorrect or missing data");
      }
    default:
      throw new Error("Invalid entry type");
  }
};

export default toNewPatient;
