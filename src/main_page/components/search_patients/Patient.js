import {Label} from "@mui/icons-material";

export function Patient(patient) {
  return (
      <div>{patient.firstName + " " + patient.lastName}</div>
  );
}