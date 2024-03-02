import { Person } from "./person.interface";

export interface IEntry {
    createdAt:       Date;
    id:              number;
    checkIn:         Date;
    checkOut:        Date;
    person:          Person;
    idRecordVehicle: any[];
    idRecordDevice:  any[];
    entryType:       IEntryType;
    inside:          boolean;
    out:             boolean;
}

export interface IEntryType {
    id:   number;
    type: string;
}
