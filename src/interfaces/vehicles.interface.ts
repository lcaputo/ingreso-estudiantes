export interface IVehicle {
    createdAt:       Date;
    id:              number;
    badge:           string;
    person:          Person;
    vehicleType:     VehicleType;
    idRecordVehicle: IDRecordVehicle[];
}

export interface IDRecordVehicle {
    createdAt: Date;
    id:        number;
    inside:    boolean;
    out:       boolean;
    dateEntry: Date;
    dateExit:  null;
}

export interface Person {
    createdAt: Date;
    id:        number;
    firtsName: string;
    lastName:  string;
    document:  number;
    state:     boolean;
}

export interface VehicleType {
    id:     number;
    vendor: string;
}
