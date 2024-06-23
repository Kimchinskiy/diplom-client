//client/http/userAPI
import { $authHost } from "./index";

export const registration = async (email, password, firstName, lastName, phoneNumber) => {
    try {
        const { data } = await $authHost.post('api/user/registration', { email, password, firstName, lastName, phoneNumber, role: 'USER' });
        localStorage.setItem('token', data.token)
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка при регистрации');
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await $authHost.post('api/user/login', { email, password });
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка при входе');
    }
};

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка при проверке пользователя');
    }
};
