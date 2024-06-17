export type TCar = {
    name: string,
    description: string,
    color: string,
    isElectric: boolean,
    status: 'available' | 'unavailable';
    features: string[];
    pricePerHour: number;
    isDeleted: boolean
}


export type TUser = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
}
