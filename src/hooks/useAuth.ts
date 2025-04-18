import { useContext, useEffect } from "react";
import authContext from "../context/Auth.context";
import { sendApiRequest } from "../helpers/axios.helper";
import { getToken } from "../helpers/storage.helper";
import { TUser } from "../types/TUser";

const useAuth = () => {
    const { user, login, logout } = useContext(authContext);

    const handleLogin = async (user: TUser) => {
        try {
            const res = await sendApiRequest.post("/auth/login", user);
            const { token } = res.data;
            login(user, token);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = await getToken();
                if (token) {
                    const { _id } = JSON.parse(atob(token.split('.')[1]));
                    const user = await sendApiRequest.get("/auth/" + _id);
                    login(user.data, token);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        getUser();
    }, []);

    return {
        user,
        login,
        logout,
        handleLogin,
    }
};

export default useAuth;