import {useEffect, useState} from "react";
import {onAuthStateChanged , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "./firebase";
const useAuth = () => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged (auth, (user) => {
            setUser(user);
            console.log("suckers")
        });

        return () => unsubscribe();
    }, [auth]);

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e);
        }
    }


    return {user, signIn, logOut};
}

export default useAuth;