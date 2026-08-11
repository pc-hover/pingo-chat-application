import { useState } from "react"
import { API_URL } from "../constants/urls"
import client from "../constants/apollo-client"

interface userLoginInput {
    email: string,
    password: string
}
interface LoginResponse {
    token?: string,
    error?: string
}

const useLogin = () => {
    const [error, setError] = useState<string>()

    const login = async (request: userLoginInput) => {

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })

            if (!response.ok) {
                if (response.status == 401) {
                    setError("Credentials are not valid")
                }
                else {
                    setError("Unknown error occured")
                }
                return;
            }
            setError("");
            await client.refetchQueries({ include: "active" });
        }
        catch (err) {
            setError("Unknown Error has Occured")
        }
    }
    return { login, error };
}
export { useLogin }