export interface Person {
    createdAt:   Date;
    id:          number;
    firtsName?:   string;
    firstName?:   string;
    lastName:    string;
    document:    number;
    state:       boolean;
    personTypes: PersonTypes;
    device:      any[];
    vehicles:    any[];
}

export interface PersonTypes {
    id:    number;
    name:  string;
    state: boolean;
}
