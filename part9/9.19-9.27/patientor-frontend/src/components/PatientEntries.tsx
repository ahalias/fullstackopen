import { useEffect, useState } from "react";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import EntryAddForm from "./PatientPage/EntryAddForm";

const divStyle = {
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: '18px',
    margin: '10px',
    padding: '10px'
  };

const HospitalEntryDetails = ({entry, diagnoses} : {entry: HospitalEntry, diagnoses: Diagnosis[] | null }) => {
    return (
         <div style={divStyle} key={entry.id}>
        {entry.date} 
        <br />
        {entry.description}
    <br />
    {entry.diagnosisCodes?.map(diagnose => 
        { 
            return <li key={diagnose}>
        {diagnose} {diagnoses?.find(it => it.code.toLowerCase() === diagnose.toLowerCase())?.name}
      </li> 
    })}
    {entry.discharge && 
    <>
    Discharge date: {entry.discharge.date}. Criteria: {entry.discharge.criteria}
    <br />
    </>
    }
      </div>
    )
}


const OccupationHealthCareDetails = ({entry, diagnoses} : {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] | null }) => {
    return (
        <div style={divStyle} key={entry.id}>

                    
                {entry.date} 
                <br />
                Employer name: {entry.employerName}
                <br />
                {entry.sickLeave && 
                <>
                Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate} 
                <br />
                </>}
                
                
                {entry.description}
            <br />
            {entry.diagnosisCodes?.map(diagnose => 
                { 
                    return <li key={diagnose}>
                {diagnose} {diagnoses?.find(it => it.code.toLowerCase() === diagnose.toLowerCase())?.name}
              </li> 
            })}
              </div>
    )
}

const HealthCheckDetails = ({entry, diagnoses} : {entry: HealthCheckEntry, diagnoses: Diagnosis[] | null })  => {
    return (
        <div style={divStyle} key={entry.id}>
                {entry.date}  
                <br />
                health check rating: {entry.healthCheckRating}
                <br />
                {entry.description} 
            <br />
            {entry.diagnosisCodes?.map(diagnose => 
                { 
                    return <li key={diagnose}>
                {diagnose} {diagnoses?.find(it => it.code.toLowerCase() === diagnose.toLowerCase())?.name}
              </li> 
            })}
              </div>
    )
}

const PatientEntries: React.FC<{ entries: Entry[] }> = ({ entries }: {entries: Entry[]} ) => {
    const id = useParams().id?.toString() || null;

    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null)


    useEffect(() => {
        const fetchDiagnoses = async () => {
            const fetchedDiagnoses = await patientService.getDiagnoses(id)
            setDiagnoses(fetchedDiagnoses)
        }
        fetchDiagnoses()
    }, [id])


    function assertNever(value: never): never {
        throw new Error(`Unhandled value: ${value}`);
      }

return (
    <>

    {entries.map(entry => {
        switch (entry.type) {
          case "Hospital":
            return < HospitalEntryDetails entry={entry}  diagnoses={diagnoses}/>
            
            case "OccupationalHealthcare":
                return < OccupationHealthCareDetails entry={entry}  diagnoses={diagnoses} />     
            case "HealthCheck":
                return < HealthCheckDetails entry={entry}  diagnoses={diagnoses} />
                
            default:
            return assertNever(entry);
                }
        }

    
    )}
    </>
);
};

export default PatientEntries;