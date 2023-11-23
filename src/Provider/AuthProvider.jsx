import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Config/firebase.config";





export const AuthContext = createContext(null)

const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {




    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)


    const google = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)
    }

    const Register = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // user sign in 
    const Login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // user logout 
    const logout = () => {
        return signOut(auth)
            .then(() => {

            }).catch((error) => {
                console.error(error)
            });
    }

    // user update
    const userUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })

    }

    const authInfo = {
        google,
        user,
        loading,
        Register,
        Login,
        logout,
        userUpdate
    }

    console.log(user)


    // observer 

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        });

        return () => {
            return unSubscribe();
        };
    }, []);




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};


export default AuthProvider;