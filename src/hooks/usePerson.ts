import create from 'zustand';
import { Person } from '../interfaces/person.interface';

interface PersonState {
    person: Person;
    setPerson: (person: Person) => void;
    getPerson: () => Person;
    getDevices: () => any[];
}

export const usePerson = create<PersonState>((set, get) => ({
    person: {
        createdAt: new Date(),
        id: 0,
        firtsName: '',
        lastName: '',
        document: 0,
        state: false,
        personTypes: {
            id: 0,
            name: '',
            state: false
        },
        device: [],
        vehicles: []
    },
    setPerson: (x: Person) => {
        console.log(x);

        set({ person: x });
    },
    getPerson: () => get().person,
    getDevices: () => get().person.device
}));