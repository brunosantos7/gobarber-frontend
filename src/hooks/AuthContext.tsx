import React, { createContext, useCallback, useState, useContext } from "react";

import api from "../services/api";

type AuthData = {
    token: string;
    user: User;
}

interface AuthCredentialsData {
    email: string;
    password: string;
}

type User = {
    id: string;
    avatar_url: string;
    name: string;
    email: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: AuthCredentialsData): void;
    signOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    const [authenticationData, setAuthenticationData] = useState<AuthData>(() => {
        const user = localStorage.getItem("@GoBarber:user");
        const token = localStorage.getItem("@GoBarber:token");

        if (user && token) {
            api.defaults.headers.authorization = `Bearer ${token}`

            return { user: JSON.parse(user), token };
        }

        return {} as AuthData;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post("sessions", { email, password });

        const { user, token } = response.data;

        localStorage.setItem("@GoBarber:user", JSON.stringify(user));
        localStorage.setItem("@GoBarber:token", token);

        setAuthenticationData({ user, token });

        api.defaults.headers.authorization = `Bearer ${token}`

    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@GoBarber:user");
        localStorage.removeItem("@GoBarber:token");

        setAuthenticationData({} as AuthData);
    }, []);

    const updateUser = useCallback((user: User) => {

        localStorage.setItem("@GoBarber:user", JSON.stringify(user));

        setAuthenticationData({
            token: authenticationData.token,
            user: {
                ...user
            }
        })
    }, [setAuthenticationData, authenticationData.token])

    return (
        <AuthContext.Provider
            value={{ user: authenticationData.user, signIn, signOut, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextData => {
    const authContext = useContext(AuthContext);

    return authContext;
};

export { useAuth, AuthProvider };
