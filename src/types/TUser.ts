import { TDbItem } from "./TDbItem";

export type TUser = TDbItem & {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    email: string;
    password: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip?: string;
    }
};
