import React, { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'src/firebase/firebase-config';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { updateEmail } from 'src/ducks/user-slice';

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
            console.log('User status Changed!');
            console.log(user);
            if (user) {
                user.email && dispatch(updateEmail(user.email));
            };
        });
    });

    return (
        <>
            {props.children}
        </>
    );
}
