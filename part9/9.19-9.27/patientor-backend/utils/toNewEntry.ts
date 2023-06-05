import Diagnose, { EntryWithoutId, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../src/types"


const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

  const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error ('Incorrect date');
    }
    return date;
    };

    const parseString = (object: unknown): string => {
        if (!isString(object)) { 
            throw new Error('Incorrect field'); 
        }
        return object;
        };

    const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
        if (typeof healthCheckRating === "number" && (healthCheckRating >= 0 && healthCheckRating <= 3)) {
            return healthCheckRating
        }
        throw new Error ("invalid Health Check Rating") 
    }

    const parseSickLeave = (object: unknown): OccupationalHealthcareEntry['sickLeave'] => {
        if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
          return undefined;
        }
      
        const sickLeaveObject = object['sickLeave'];
        if (
          !sickLeaveObject ||
          typeof sickLeaveObject !== 'object' ||
          !('startDate' in sickLeaveObject) ||
          !('endDate' in sickLeaveObject)
        ) {
          return undefined;
        }
      
        return {
          startDate: parseDate(sickLeaveObject['startDate']),
          endDate: parseDate(sickLeaveObject['endDate']),
        };
      };

      const parseDischarge = (object: unknown): HospitalEntry['discharge'] => {
        if (!object || typeof object !== 'object' || !('discharge' in object)) {
            throw new Error("Invalid discharge object");
        }
      
        const dischargeObject = object['discharge'];
        if (
          !dischargeObject ||
          typeof dischargeObject !== 'object' ||
          !('date' in dischargeObject) ||
          !('criteria' in dischargeObject)
        ) {
            throw new Error("Invalid discharge object");
        }
      
        return {
          date: parseDate(dischargeObject['date']),
          criteria: parseString(dischargeObject['criteria']),
        };
      };
          
        



const toNewEntry = (object: unknown): EntryWithoutId => {
    const diagnosisCodes = parseDiagnosisCodes(object)
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect or missing data");
    }
if (object && 'description' in object && "date" in object && 'specialist' in object && 'type' in object) {
    const baseObject = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: diagnosisCodes,
    }
switch(object.type) {
    case "HealthCheck": {
        if ('healthCheckRating' in object) {
            const newEntry: EntryWithoutId = {
            ...baseObject,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    type: object.type
        }
        return newEntry
        }
        break
    }
    case "OccupationalHealthcare": {
        const sickLeave = parseSickLeave(object)
        if ("employerName" in object) {
            const newEntry: EntryWithoutId = { 
                ...baseObject,
                employerName: parseString(object.employerName),
                sickLeave: sickLeave,
                type: object.type
            }
            return newEntry
        }
        break
    }
    case "Hospital": {
        const discharge = parseDischarge(object);
        if (discharge === undefined) {
          throw new Error("Invalid discharge object");
        }
        const newEntry: EntryWithoutId = {
          ...baseObject,
          discharge: discharge,
          type: "Hospital",
        };
        return newEntry;
      }

}
}
throw new Error('Wrong data: some fields are missing')
}



export default toNewEntry