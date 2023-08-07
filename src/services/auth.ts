import { VITE_API_URL } from "../config"

import.meta.env

export const login = async (email: string, password: string) => {
    const response = await fetch(`${VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // cors
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ email, password })
    })
    return response
}

