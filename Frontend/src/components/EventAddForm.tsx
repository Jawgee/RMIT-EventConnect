import { IonButton, useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input, { type InputProps } from '../components/Input';
import { replacePage } from '../App';
import { addEvent, getTags } from '../data/events';
import SelectInput from '../components/SelectInput';

const getInfo = async () => {
    const info = await getTags();
    if (typeof info === 'string') {
        // Do something to show that something went wrong
        return {};
    } else {
        return info;
    }
};

const EventAddForm: React.FC<{ user: string }> = ({ user }) => {
    // Tag info
    const [tags, setTags] = useState<any[]>([]);

    // Controller for the forms
    const { control, handleSubmit } = useForm();

    // Routing to allow to manually redirect the user
    const router = useIonRouter();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        getInfo().then((e) => {
            if (typeof e === 'string') {
                // Do something to show that something went wrong
                setErrorMessage(e);
            } else {
                // send tags info somewhere
                setTags(e);
            }
        });
    }, []);

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
    return (
        <form onSubmit={handleSubmit(addEventOnSubmit)}>
            {/* TODO: Create proper design*/}

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
            {tags &&
                Object.keys(tags).map((element, index) => {
                    //@ts-ignore
                    const e = tags[element];
                    return (
                        <SelectInput
                            control={control}
                            key={index}
                            options={e.tags}
                            placeholder={'Select an option'}
                            label={element}
                        />
                    );
                })}
            <IonButton expand="block" type="submit" className="ion-margin-top">
                Submit
            </IonButton>
            {/* </IonList> */}
            {/* TODO: make this look better */}
            {errorMessage && <p>{errorMessage}</p>}
            <br />
        </form>
    );
};

export default EventAddForm;
