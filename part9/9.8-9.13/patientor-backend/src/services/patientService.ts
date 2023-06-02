import patients from '../data/patients';
import { CleanPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getPatients = (): Patient[] => {
    return patients;
};

const getCleanPatients = (): CleanPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {id: id, ...entry};

    patients.push(newPatient);
    return newPatient;
};


export default {getPatients, getCleanPatients, addPatient};