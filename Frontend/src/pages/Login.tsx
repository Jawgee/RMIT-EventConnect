import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButton,
    useIonRouter,
    IonBackButton,
    IonButtons,
    IonRippleEffect,
    IonTitle,
} from '@ionic/react';
import './Login.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { verifyUser } from '../data/accounts.js';
import { PasswordRegex, replacePage } from '../App';
import { lockClosed, mail } from 'ionicons/icons';

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
            max: 45,
            icon: mail,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            clearOnEdit: false,
            min: 7,
            max: 45,
            pattern: PasswordRegex,
            helperText: 'Password should have at least 1 uppercase letter, 1 digit and 1 special character.',
            icon: lockClosed,
        },
    ];

    // Handles submit
    const loginUserOnSubmit = (data: any) => {
        verifyUser(data.email, data.password).then((e) => {
            // Get the information from the backend
            const [successful, message] = e;

            // If there were no issues
            if (successful) {
                // Set the user to be used elsewhere
                setUser(data.email);
                // Send the user to the home page
                replacePage('home', router);
            } else {
                // Set an error to show on the page
                setErrorMessage(message);
            }
        });
    };

    // TODO: Create proper design
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Log In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(loginUserOnSubmit)}>
                    {/* TODO: Decide if should make it into a list or not (aesthetic choice) */}
                    {/* <IonList> */}
                    {formFields.map((field, index) => (
                        /* <IonItem> */
                        <Input {...field} control={control} key={index} />
                        /* </IonItem> */
                    ))}
                    <IonButton shape="round" expand="block" color="primary" fill="solid">
                        Log In
                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                    </IonButton>
                    {/* </IonList> */}
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
                {/* Link to register page */}
                <p>Don't have an account yet?</p>
                <button className="RegisterNowButton"  
                onClick={() => {replacePage('register', router);}}>
                     Create an account!
                </button>
            </IonContent>
        </IonPage>
    );
};

export default Login;
