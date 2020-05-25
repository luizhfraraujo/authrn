import React, { createContext, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth.service';
import api from '../services/api.service';

interface UserModel {
    name: string;
    email: string;
}

interface AuthModel {
    signed: boolean;
    user: UserModel | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthModel>({} as AuthModel);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const storagedUser = await AsyncStorage.getItem("@authrn:user")
            const storagedToken = await AsyncStorage.getItem("@authrn:token")

            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (storagedUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            } else {
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    async function signIn() {
        setLoading(true);
        const response = await auth.signIn();

        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem("@authrn:user", JSON.stringify(response.user))
        await AsyncStorage.setItem("@authrn:token", JSON.stringify(response.token))
        setLoading(false);
    }

    function signOut() {
        AsyncStorage.clear().then((res) => {
            setUser(null);
        })

    }



    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

//export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}