import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    useIonRouter,
    IonButtons,
    IonBackButton,
    IonRippleEffect,
} from '@ionic/react';
import '../styles/register.css';
import { Suspense, lazy, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { registerUser } from '../data/accounts.js';
import { PasswordRegex, replacePage } from '../App';
import { mail, lockClosed, person } from 'ionicons/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserInfo } from '../data/profileReducer';
const ProfileOptions = lazy(() => import('../components/ProfileOptions'));

const Register: React.FC<{
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    setID: React.Dispatch<React.SetStateAction<number>>;
    // testFunction: Function;
}> = ({
    setUser,
    setID,
    // testFunction
}) => {
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
            name: 'first_name',
            label: 'First Name',
            icon: person,
        },
        {
            name: 'last_name',
            label: 'Last Name',
            icon: person,
        },
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
    const registerUserOnSubmit: SubmitHandler<UserInfo> = (data) => {
        registerUser(data).then((e) => {
            // Get the information from the backend
            const [successful, message] = e;

            // If there were no issues
            if (successful) {
                // Set the user to be used elsewhere
                setUser(message.email);
                setID(message.id);
                // Send the user to the home page
                replacePage('tags', router);
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
                <div className="register-container">
                    <div className="register-header">
                        <IonHeader className="ion-no-border">
                            <IonTitle className="register-ion-title">Sign Up</IonTitle>
                        </IonHeader>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit(registerUserOnSubmit)}>
                        {/* TODO: Decide if this needs to go in the middle or something */}
                        <Suspense fallback={<LoadingSpinner />}>
                            <ProfileOptions control={control} />
                        </Suspense>
                        {formFields.map((field, index) => (
                            <Input {...field} control={control} key={index} />
                        ))}

                        <div className="register-button">
                            <IonButton
                                className="theSignUpButton"
                                shape="round"
                                color="primary"
                                fill="solid"
                                type="submit"
                            >
                                Sign Up
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                            </IonButton>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>

                    {/* Link to login page */}
                    <div className="register-info">
                        <p>
                            Already have an account?{' '}
                            <button
                                className="LoginNowButton"
                                onClick={() => {
                                    replacePage('login', router);
                                }}
                            >
                                Log In!
                            </button>
                        </p>
                    </div>
                    {/* <IonButton className="signup-button" onClick={() => testFunction(router)}>
                        test button
                    </IonButton> */}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
