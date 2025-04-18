import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import authContext from "../context/Auth.context";
import { sendApiRequest } from "../helpers/axios.helper";
import { deleteToken, getToken, saveToken } from "../helpers/storage.helper";
import { TRootStackParamList } from "../types/TRootStackParamList";
import { TUser } from "../types/TUser";

const useAuth = () => {
    const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();
    const { user, login, logout } = useContext(authContext);

    const handleLogin = async (data: Partial<TUser>) => {
        try {
            const res = await sendApiRequest.post("/auth/login", data);
            const { token } = res.data;

            await saveToken(token);
            const user = await getUser(token);
            login(user);

            Toast.show({
                type: "success",
                text1: "Login successful",
                text2: "Welcome back!",
            });

            navigate("Home");
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

    const handleRegister = async (data: TUser) => {
        try {
            await sendApiRequest.post("/auth/register", data);

            Toast.show({
                type: "success",
                text1: "Registration successful",
                text2: "Welcome aboard!",
            });

            navigate("Login");
        } catch (error) {
            console.error("Registration error:", error);

            Toast.show({
                type: "error",
                text1: "Registration failed",
                text2: "Please try again.",
            });
        }
    };

    const getUser = async (token: string) => {
        try {
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
        (async () => {
            const token = await getToken();
            if (token) {
                await getUser(token!);
            }
        })();
    }, []);

    return {
        user,
        handleLogout,
        handleLogin,
        handleRegister,
    }
};

export default useAuth;