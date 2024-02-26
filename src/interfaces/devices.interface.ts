export interface Device {
    id: number;
    deviceType: DeviceType;
    serialId: string;
}

export interface DeviceType {
    id: number;
    brand: string;
}