import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Suspense, lazy, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Controller, useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { replacePage } from '../App';
import { IonButton, useIonRouter } from '@ionic/react';
import { addEvent } from '../data/events';
const EventAddTags = lazy(() => import('../components/EventAddTags'));

const EventAdd: React.FC<{ user: string }> = ({ user }) => {
    // Controller for the forms
    const { control, handleSubmit } = useForm({ defaultValues: { owner: user } });
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
        console.log(data);
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
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create an Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleSubmit(addEventOnSubmit)}>
                    {/* TODO: Create proper design */}

                    <Controller
                        render={({ field }) => {
                            console.log(field);
                            return <input onChange={field.onChange} value={field.value} type="hidden" />;
                        }}
                        name="owner"
                        control={control}
                    />
                    {formFields.map((field, index) => (
                        <Input {...field} control={control} key={index} />
                    ))}

                    <Suspense fallback={<LoadingSpinner />}>
                        <EventAddTags control={control} />
                    </Suspense>

                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Submit
                    </IonButton>
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                    <br />
                </form>
            </IonContent>
        </IonPage>
    );
};

export default EventAdd;
