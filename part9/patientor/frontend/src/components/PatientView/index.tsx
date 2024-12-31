import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnose } from "../../types";
import { Transgender, Male, Female } from "@mui/icons-material";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import { Button } from "@mui/material";
import EntryForm from "./EntryForm";

interface Props {
  diagnoses: Diagnose[];
}

const PatientView = ({ diagnoses }: Props) => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient>();
  const [visible, setVisible] = useState<boolean>(false);

  const fetchPatient = async (id: string) => {
    const patient = await patientService.getById(id);
    setPatient(patient);
  };

  useEffect(() => {
    void fetchPatient(match?.params.id as string);
  }, [match]);

  const handleFormSubmit = () => {
    setVisible(false);
    void fetchPatient(match?.params.id as string);
  };

  if (!patient) {
    return <div>Not found</div>;
  }

  let genderIcon = null;
  if (patient.gender === "male") {
    genderIcon = <Male />;
  } else if (patient.gender === "female") {
    genderIcon = <Female />;
  } else {
    genderIcon = <Transgender />;
  }

  return (
    <div>
      <h1>
        {patient.name} {genderIcon}
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Button variant="contained" color="primary" onClick={() => setVisible(true)}>
        Add Hospital Entry
      </Button>
      {visible && (
        <EntryForm patientId={patient.id} type="Hospital" onFormSubmit={handleFormSubmit} diagnoses={diagnoses} />
      )}
      <h3>entries</h3>
      {patient.entries.map(e => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientView;
