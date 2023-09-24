import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter } from '@ionic/react';
// import './Register.css';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { registerUser } from '../data/accounts.js';
import { replacePage } from '../App';
import { addEvent } from '../data/events';

const EventAdd: React.FC<{ user: string }> = ({ user }) => {
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
            name: 'name',
            label: 'Event Name',
        },
        {
            name: 'description',
            label: 'Description',
            max: 255,
        },
        {
            name: 'location',
            label: 'Location',
        },
    ];

    // Handles submit
    const addEventOnSubmit = (data: any) => {
        addEvent(data).then((e) => {
            // Get the information from the backend
            const [successful, message] = e;
            // If there were no issues
            if (successful) {
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create an Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(addEventOnSubmit)}>
                    {/* TODO: Decide if should make it into a list or not (aesthetic choice) */}
                    {/* <IonList> */}
                    <Controller
                        // console.log(field);
                        render={({ field }) => <input onChange={field.onChange} value={user} type="hidden" />}
                        name="owner"
                        control={control}
                    />
                    {formFields.map((field, index) => (
                        /* <IonItem> */
                        <Input {...field} control={control} key={index} />
                        /* </IonItem> */
                    ))}
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Submit
                    </IonButton>
                    {/* </IonList> */}
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                    <br />
                </form>
            </IonContent>
        </IonPage>
    );
};

export default EventAdd;
