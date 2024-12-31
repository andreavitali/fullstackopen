import { Diagnose, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import { useState } from "react";
import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, Input, InputLabel, TextField } from "@mui/material";
import { AxiosError } from "axios";

interface Props {
  patientId: string;
  type: string;
  onFormSubmit: () => void;
  diagnoses: Diagnose[];
}

const EntryForm = ({ patientId, type, onFormSubmit, diagnoses }: Props) => {
  const [error, setError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // Hospital
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleDiagnosisCodeChange = (code: string) => {
    const updatedCodes = [...diagnosisCodes];

    if (updatedCodes.includes(code)) {
      // Remove code if already selected
      const index = updatedCodes.indexOf(code);
      updatedCodes.splice(index, 1);
    } else {
      // Add code if not selected
      updatedCodes.push(code);
    }

    setDiagnosisCodes(updatedCodes);
  };

  const handleAddEntry = async () => {
    let newEntry: EntryWithoutId | undefined = undefined;
    newEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    };
    try {
      await patientService.createEntry(patientId, newEntry);
      onFormSubmit();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.error;
        if (errorMessage) {
          setError(errorMessage);
        }
      }
    }
  };

  return (
    <Box
      border={"1px dotted black"}
      borderRadius="5px"
      margin={"12px"}
      padding={"20px"}
      display={"flex"}
      flexDirection={"column"}
      rowGap={"20px"}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <InputLabel>Date</InputLabel>
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <TextField
        fullWidth
        label="Specialist"
        variant="outlined"
        value={specialist}
        onChange={e => setSpecialist(e.target.value)}
      />
      {type == "Hospital" && (
        <>
          <InputLabel>Discharge date</InputLabel>
          <Input type="date" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
          <TextField
            fullWidth
            label="Discharge criteria"
            variant="outlined"
            value={dischargeCriteria}
            onChange={e => setDischargeCriteria(e.target.value)}
          />
        </>
      )}
      <FormGroup>
        <p>Diagnosis Codes</p>
        {diagnoses.map(d => (
          <FormControlLabel
            key={d.code}
            control={
              <Checkbox checked={diagnosisCodes.includes(d.code)} onChange={() => handleDiagnosisCodeChange(d.code)} />
            }
            label={`${d.code} - ${d.name}`}
          />
        ))}
      </FormGroup>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Button variant="contained" color="error" onClick={() => onFormSubmit()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddEntry}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default EntryForm;
