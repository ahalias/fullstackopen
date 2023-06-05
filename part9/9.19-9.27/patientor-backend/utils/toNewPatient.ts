import { Gender, NewPatient, Entry, EntryType } from "../src/types";



const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
    const pattern = /^([0-9]{6})-[0-9a-zA-Z]+$/;

    return Boolean(Number(ssn.split("-")[0]) && pattern.test(ssn));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(it => 
        it.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
if (!isString(name)) { 
    throw new Error('Incorrect name'); 
}
return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) { 
        throw new Error('Incorrect occupation');
}
    return occupation;
    };

const parseDate = (date: unknown): string => {
if (!isString(date) || !isDate(date)) {
    throw new Error ('Incorrect date');
}
return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn) || !isSsn(ssn)) {
        throw new Error ('Incorrect ssn');

    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
}
return gender;
};

const parseEntry = (entry: unknown): Entry => {
    if (!entry || typeof entry !== 'object' || !entry.hasOwnProperty('type') || !isValidEntryType((entry as Record<string, unknown>).type)) {
      throw new Error("Incorrect entry");
    }
    return entry as Entry;
  };

  const isValidEntryType = (type: unknown): type is EntryType => {
    return typeof type === 'string' && (type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck");
  };



const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect or missing data");
    }
    if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'ssn' in object && 'gender' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            entries: [parseEntry(object.entries)]
        
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');


};

export default toNewPatient;
