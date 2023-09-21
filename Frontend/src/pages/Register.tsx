import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter } from '@ionic/react';
// import './Register.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { registerUser } from '../data/accounts.js';
import { PasswordRegex, replacePage } from '../App';
import { mail, lockClosed, person } from 'ionicons/icons';

const Register: React.FC<{
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    setID: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setUser, setID }) => {
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
    const registerUserOnSubmit = (data: any) => {
        registerUser(data.email, data.password, data.first_name, data.last_name).then((e) => {
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

    // TODO: Create proper design
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(registerUserOnSubmit)}>
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
                        Sign Up
                    </IonButton>
                    {/* </IonList> */}
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                    <br />
                </form>
                {/* Link to login page */}
                <button
                    onClick={() => {
                        replacePage('login', router);
                    }}
                >
                    Have an account? Login here
                </button>
            </IonContent>
        </IonPage>
    );
};

export default Register;
