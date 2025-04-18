import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync('auth-token', token);
}

export const getToken = async () => {
    return await SecureStore.getItemAsync('auth-token');
}

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync('auth-token');
}