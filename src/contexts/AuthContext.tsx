import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, provider } from "../services/firebase";

type AuthContextType = {
    user: UserCredential['user'] | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserCredential['user']>();

    async function signInWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = useContext(AuthContext);

    return value
}