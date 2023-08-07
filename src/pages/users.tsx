import { useState } from "react";
import Table from "../components/table";
import AdminLayout from "../layout/admin";
import { VITE_API_URL } from "../config";

interface dataSet {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    inside?: boolean;
}

export default function Users() {
    const [user, setUser] = useState(null)

    const headers = [
        { name: 'Name', key: 'name' },
        { name: 'Email', key: 'email' },
        { name: 'Role', key: 'role' },
        { name: 'Created At', key: 'createdAt' },
        { name: 'Updated At', key: 'updatedAt' },
        { name: 'Dentro', key: 'inside'}
    ]

    const dataSet: dataSet[] = [
        {
            name: 'John Doe',
            email: 'we@g.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
        },
        {
            name: 'John Doe',
            email: 'exa323@c.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
        },
        {
            name: 'John Doe',
            email: 'we@g.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
        },
        {
            name: 'John Doe',
            email: 'exa323@c.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
        },
        {
            name: 'John Doe',
            email: 'we@g.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
        },
        {
            name: 'John Doe',
            email: 'exa323@c.co',
            role: 'admin',
            createdAt: '2021-09-01',
            updatedAt: '2021-09-01',
            inside: true
        },
    ]

    return (
        <AdminLayout>
            <button onClick={getusers}>Get Users</button>
            <Table headers={headers} dataSet={dataSet} />
        </AdminLayout>
    )

    async function getusers() {
        const response = await fetch(`${VITE_API_URL}/user`, {
            method: 'GET',
            credentials: 'include',
            // send cookies

            headers: {
            }
        })
        const data = await response.json()
        setUser(data)
    }
}