import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonList, IonIcon } from '@ionic/react';
import './Login.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input, { InputProps } from '../components/Input';
import { verifyUser } from '../data/accounts.js';
import { toPage } from '../App';

const Login: React.FC<{ setUser: React.Dispatch<React.SetStateAction<string | null>> }> = ({ setUser }) => {
    // Controller for the forms
    const { control, handleSubmit } = useForm();

    // Routing to allow to manually redirect the user
    const router = useIonRouter();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');

    // Holds all of the fields and their information
    const formFields: InputProps[] = [
        {
            name: 'email',
            type: 'email',
            label: 'Email',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            clearOnEdit: false,
            min: 7,
            pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$',
            helperText: 'Password should have at least 1 uppercase letter, 1 digit and 1 special character.',
        },
    ];

    // Handles submit
    const loginUserOnSubmit = (data: any) => {
        verifyUser(data.email, data.password).then((e) => {
            // Get the information from the backend
            let [successful, message] = e;

            // If there were no issues
            if (successful) {
                // TODO: Add the proper information here
                // TODO: use data.email probably
                // Set the user to be used elsewhere
                setUser('test');
                // Send the user to the home page
                toPage('home', router);
            } else {
                // Set an error to show on the page
                setErrorMessage(message);
            }
        });
    };

    // TODO: Create proper design
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form onSubmit={handleSubmit(loginUserOnSubmit)}>
                    {/* TODO: Decide if should make it into a list or not (aesthetic choice) */}
                    {/* <IonList> */}
                    {formFields.map(
                        (field, index) => (
                            /* <IonItem> */
                            <Input {...field} control={control} key={index} />
                        )
                        /* </IonItem> */
                    )}
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Login
                    </IonButton>
                    {/* </IonList> */}
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
                {/* Link to register page */}
                <button onClick={() => toPage('register', router)}>Don't have an account? Register now</button>
            </IonContent>
        </IonPage>
    );
};

export default Login;
