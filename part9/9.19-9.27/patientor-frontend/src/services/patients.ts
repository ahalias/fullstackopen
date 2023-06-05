import axios from "axios";
import { Diagnosis, Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatient = async (id: string | null) => {
const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
return response.data
}

const getDiagnoses = async (id: string | null) => {
  const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`)
  return response.data

}

const postEntry = async (id: string | null, entry: EntryWithoutId) => {
  const response = await axios.post<EntryWithoutId>(`${apiBaseUrl}/patients/${id}/entries`, entry)
  console.log(response.data)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatient, getDiagnoses, postEntry
};

