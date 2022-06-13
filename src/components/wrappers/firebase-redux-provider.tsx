import React, { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'src/firebase/firebase-config';
import { User } from 'src/types/user';
import { useAppDispatch } from 'src/hooks/useful-ducks';
import { signIn, signOut } from 'src/ducks/user-slice';

interface FirebaseReduxToolkitProviderProps {
    children: ReactNode
}

export const FirebaseReduxToolkitProvider: React.FC<FirebaseReduxToolkitProviderProps> = (props) => {
    /*
        Component will wrap the main app component, updating the redux state when firebase states change
    */
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            // Check for user status
            console.log('User status changed!');
            console.log(user);
            // create user object
            const userState:User = {
                uid: user?.uid,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                isAnonymous: user?.isAnonymous,
                emailVerified: user?.emailVerified,
                loggedIn: true,
            }
            if (user) {
                dispatch(signIn(userState));
            } else {
                dispatch(signOut());
            };
        });
    });

    return (
        <>
            {props.children}
        </>
    );
}
