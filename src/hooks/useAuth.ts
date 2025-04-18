import { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import authContext from "../context/Auth.context";
import { sendApiRequest } from "../helpers/axios.helper";
import { deleteToken, getToken, saveToken } from "../helpers/storage.helper";
import { TUser } from "../types/TUser";

const useAuth = () => {
    const { user, login, logout } = useContext(authContext);

    const handleLogin = async (data: Partial<TUser>) => {
        try {
            const res = await sendApiRequest.post("/auth/login", data);
            const { token } = res.data;
            await saveToken(token);
            const user = await getUser();
            login(user);
            Toast.show({
                type: "success",
                text1: "Login successful",
                text2: "Welcome back!",
            });
        } catch (error) {
            console.error("Login error:", error);
            Toast.show({
                type: "error",
                text1: "Login failed",
                text2: "Please check your credentials.",
            });
        }
    };

    const handleLogout = async () => {
        logout();
        deleteToken();
        Toast.show({
            type: "success",
            text1: "Logout successful",
            text2: "See you next time!",
        });
    };

    const getUser = async () => {
        try {
            const token = await getToken();
            if (token) {
                const { _id } = JSON.parse(atob(token.split('.')[1]));
                const user = await sendApiRequest.get("/auth/" + _id);
                return user.data;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        handleLogout,
        handleLogin,
    }
};

export default useAuth;