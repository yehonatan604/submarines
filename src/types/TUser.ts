import { TDbItem } from "./TDbItem";

export type TUser = TDbItem & {
    name: string;
    email: string;
    password: string;
};
