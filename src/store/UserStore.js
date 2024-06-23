// UserStore.js
import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._role = 'user'; // Добавляем роль пользователя
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    setRole(role) { // Добавляем сеттер для роли
        this._role = role;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get role() { // Добавляем геттер для роли
        return this._role;
    }
}