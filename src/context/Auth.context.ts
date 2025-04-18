import { createContext } from "react";
import { TUser } from "../types/TUser";

type TAuthContext = {
    user: TUser | null;
    login: (user: TUser) => void;
    logout: () => void;
};

const authContext = createContext<TAuthContext>({
    user: null,
    login: () => { },
    logout: () => { },
});

export default authContext;