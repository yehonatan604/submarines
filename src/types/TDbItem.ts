export type TDbItem = {
    _id?: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
    status?: "active" | "inactive";
    serialNumber?: number;
};
