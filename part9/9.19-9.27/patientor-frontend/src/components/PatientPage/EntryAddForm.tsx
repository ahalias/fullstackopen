import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types"
import patientService from "../../services/patients"
import axios from "axios"
import { Alert } from "@mui/material"



const EntryAddForm = ({id, entries, setPatient}: {id: string | null, entries: Entry[] | null, setPatient: Dispatch<SetStateAction<Patient | null>> }) => {

const notificationStyle = {
    border: '1px solid black',
    borderRadius: '5px'
}


    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [specialist, setSpecialist] = useState<string>("")
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | 0>(0)
    const [diagnosiscode, setDiagnosiscode] = useState<string>('')
    const [diagnosiscodes, setDiagnosiscodes] = useState<Array<string>>([])
    const [notification, setNotification] = useState<string | null>(null)


    useEffect(() => {
        const fetchPatient = async () => {
          const fetchedPatient = await patientService.getPatient(id);
          setPatient(fetchedPatient);
        };
        fetchPatient();
      }, [id, setPatient, entries]);

    if (!id || !entries) {
        return null;
      }



    const onSubmitHandler = async (event: { preventDefault: () => void }) => {
        event.preventDefault()


        try {
            const response = await patientService.postEntry(id, {
                description: description,
                date: date,
                specialist: specialist,
                healthCheckRating: healthCheckRating,
                diagnosisCodes: diagnosiscodes,
                type: "HealthCheck"
            })
if (typeof response !== "object") {
    setTimeout(() => {
        setNotification(null)

    }, 1000)
    setNotification(response)

}
            setSpecialist('')
            setDate('')
            setDescription('')
            setHealthCheckRating(0)
            setDiagnosiscode('')
            setDiagnosiscodes([])
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setNotification(message);
              } else {
                setNotification("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              setNotification("Unknown error");
            }
          }

    }


    return (
<div>
{notification && <div style={notificationStyle}>{notification}</div>}
    <h3>New HealthCheck Entry</h3>
    <form onSubmit={onSubmitHandler} >
        Description: <input
        type="text"
        value={description}
        onChange={((event) => setDescription(event.target.value))}
        />
        <br />
        Date: <input
        type="date"
        value={date}
        onChange={((event) => setDate(event.target.value))}
        />
         <br />
        Specialist: <input
        type="text"
        value={specialist}
        onChange={((event) => setSpecialist(event.target.value))}
        />
        <br />
        Health Check Rating: <input
        type="number"
        value={healthCheckRating || ''}
        onChange={((event) => setHealthCheckRating(Number(event.target.value)))}
        />
        <br />
        Diagnosis codes: <input
        type="text"
        value={diagnosiscode}
        onChange={((event) => {
            setDiagnosiscode(event.target.value)
        })}
        />
        <button type="button" onClick={(() => {
            setDiagnosiscodes(codes => [...codes, diagnosiscode])
            setDiagnosiscode('')

        })}>add</button>
        <br />
        {diagnosiscodes.join(', ')}
        <br />
<button type="submit">add entry</button>
    </form>
</div>
    )
}


export default EntryAddForm