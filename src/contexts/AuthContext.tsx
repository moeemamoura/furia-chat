import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, provider } from "../services/firebase";

type AuthContextType = {
    user: UserCredential['user'] | undefined;
    signInWithGoogle: () => Promise<void>;
    signOut: () => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserCredential['user']>();

    async function signInWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        localStorage.setItem('user', JSON.stringify(result.user))
        setUser(result.user);
    }

    function signOut() {
        localStorage.removeItem('user')
        setUser(undefined);
    }

    function getLoggedUser() {
        const userData = localStorage.getItem('user');

        if (!userData) {
            return;
        }

        const formattedUserData = JSON.parse(userData);

        setUser(formattedUserData);
    }

    useEffect(() => {
        getLoggedUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = useContext(AuthContext);

    return value
}