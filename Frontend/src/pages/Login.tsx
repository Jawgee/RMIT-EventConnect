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
import '../styles/Login.css';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { verifyUser } from '../data/accounts.js';
import { PasswordRegex, replacePage } from '../App';
import { lockClosed, mail } from 'ionicons/icons';
import { UserInfo } from '../data/profileReducer';

const Login: React.FC<{ setUser: (user?: string, id?: number) => void }> = ({ setUser }) => {
    // Controller for the forms
    const { control, handleSubmit } = useForm<UserInfo>();

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
    const loginUserOnSubmit: SubmitHandler<UserInfo> = (data) => {
        verifyUser(data).then((e) => {
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

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="login-container">
                    <div className="login-header">
                        <IonHeader className="ion-no-border">
                            <IonTitle className="login-ion-title">Log In</IonTitle>
                        </IonHeader>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit(loginUserOnSubmit)}>
                        {formFields.map((field, index) => (
                            <Input {...field} control={control} key={index} />
                        ))}
                        <div className="login-button">
                            <IonButton
                                className="theLogInButton"
                                shape="round"
                                color="primary"
                                fill="solid"
                                type="submit"
                            >
                                Log In
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                            </IonButton>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>

                    {/* Link to register page */}
                    <div className="login-info">
                        <p>
                            Don't have an account yet?{' '}
                            <button
                                className="RegisterNowButton"
                                onClick={() => {
                                    replacePage('register', router);
                                }}
                            >
                                Sign up!
                            </button>
                        </p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
