import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male , Female, Transgender } from '@mui/icons-material';
import PatientEntries from "../PatientEntries";
import EntryAddForm from "./EntryAddForm";

const PatientToShow = () => {
  const id = useParams().id?.toString() || null;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getPatient(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();
  }, [id]);

  return (
    <div>
      {patient && 
      <>
      <h2>{patient.name} { patient.gender === "male" 
      ? <Male />
      : patient.gender === "female"
      ? < Female />
      : < Transgender />
    }</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      </>
      }
                <div>
                { patient && patient.entries &&  <EntryAddForm id={id} entries={patient.entries} setPatient={setPatient}/> }
      </div>
      <h2>Entries</h2>
      { patient && patient.entries && <PatientEntries entries={patient.entries} />
    
    }
    </div>
  );
};

export default PatientToShow;