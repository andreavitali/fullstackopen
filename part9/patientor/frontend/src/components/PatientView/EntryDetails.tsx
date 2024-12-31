import Box from "@mui/material/Box";
import React from "react";
import { Diagnose, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { LocalHospital, HealthAndSafety, MedicalServices } from "@mui/icons-material";

const baseEntryStyle = { marginTop: 10, marginBottom: 10 };

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <b>
        Hospital <LocalHospital />
      </b>
      {entry.discharge && (
        <div>
          Discharge: {entry.discharge.date} <i>({entry.discharge.criteria})</i>
        </div>
      )}
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <b>
        Occupational Healthcare ({entry.employerName}) <MedicalServices />
      </b>
      {entry.sickLeave && (
        <div>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <b>
        Health Check <HealthAndSafety />
      </b>

      <div>Rating: {entry.healthCheckRating}</div>
    </div>
  );
};

const SpecificEntry = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      throw new Error(`Unhandled entry: ${JSON.stringify(entry)}`);
  }
};

interface Props {
  entry: Entry;
  diagnoses: Diagnose[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnose = (code: string) => diagnoses.find(d => d.code === code)?.name;
  return (
    <Box border={"1px solid black"} borderRadius="5px" marginBottom={"12px"} padding={"6px"}>
      {SpecificEntry(entry)}
      <div style={baseEntryStyle}>
        {entry.date} - <i>{entry.description}</i>
        <ul>
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((dc, idx) => (
              <li key={idx}>
                {dc} {getDiagnose(dc)}
              </li>
            ))}
        </ul>
      </div>
      <div>Diagnosis by {entry.specialist}</div>
    </Box>
  );
};

export default EntryDetails;
