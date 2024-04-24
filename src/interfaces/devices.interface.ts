import { Person } from './person.interface';
export interface Device {
    id: number;
    deviceType: DeviceType;
    serialId: string;
    person: Person;
}

export interface DeviceType {
    id: number;
    brand: string;
    icon?: string;
}