import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Logout() {
    const navigate = useNavigate();
    const logout = useAuthStore((state: any) => state.logout);
    useEffect(() => {
        logout();
        navigate("/login");
    }, []);

    return null;
}