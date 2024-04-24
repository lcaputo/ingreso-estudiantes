export interface CreateUser {
  id: number;
  email?: string;
  username?: string;
  password?: string;
  state?: boolean;
  roles?: number[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  state: boolean;
  roles: any;
  password?: string;
}

export interface Role {
  id: number;
  tipo: string;
}
