import patients from '../data/patients';
import { CleanPatient, Entry, EntryWithoutId, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getPatients = (): Patient[] => {
    return patients;
};

const getDistinctPatient = (id: string): Patient | string => {
    try {
      const patient = patients.find((patient) => patient.id === id);
      if (patient) {
        const cleanPatient: Patient = {
          ...patient,
          entries: patient.entries || []
                };
        return cleanPatient;
      } else {
        throw new Error("Patient not found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  };

const getCleanPatients = (): CleanPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {id: id, ...entry};

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry[] | string => {
const newEntry = {id: uuid(), ...entry}
try {
  const patient = patients.find(patient => patient.id === id) 
  if (patient) {
    patient.entries.push(newEntry)
    return patient.entries
  } else return "Patient not found"

} catch (error) {
  if (error instanceof Error) return error.message
}
return "An unknown error occurred";


}


export default {getPatients, getCleanPatients, addPatient, getDistinctPatient, addEntry};