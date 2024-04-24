import create from "zustand";
import { Person } from "../interfaces/person.interface";
import { IEntry } from "../interfaces/entry.interface";
import { Device } from "../interfaces/devices.interface";

interface EntryState {
  entry: IEntry;
  setEntry: (person: IEntry) => void;
  getDevices: () => Device[];
//   clearEntry: () => void;
}

export const useEntry = create<EntryState>((set, get) => ({
  entry: {
    createdAt: new Date(),
    id: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    person: {
      createdAt: new Date(),
      id: 0,
      firtsName: "",
      lastName: "",
      document: 0,
      state: false,
      personTypes: {
        id: 0,
        name: "",
        state: false,
      },
      device: [],
      vehicles: [],
    },
    idRecordVehicle: [],
    idRecordDevice: [],
    entryType: {
      id: 0,
      type: "",
    },
    out: true,
    inside: false,
  },
  setEntry: (x: IEntry) => {
    set({ entry: x });
  },
  getDevices: () => get().entry.person.device,
//   clearEntry: () => {
//     set({
//         entry: {
//             createdAt: new Date(),
//             id: 0,
//             checkIn: new Date(),
//             checkOut: new Date(),
//             person: {
//               createdAt: new Date(),
//               id: 0,
//               firtsName: "",
//               lastName: "",
//               document: 0,
//               state: false,
//               personTypes: {
//                 id: 0,
//                 name: "",
//                 state: false,
//               },
//               device: [],
//               vehicles: [],
//             },
//             idRecordVehicle: [],
//             idRecordDevice: [],
//             entryType: {
//               id: 0,
//               type: "",
//             },
//             out: false,
//             inside: false,
//             }
//     });
//     }
}));
