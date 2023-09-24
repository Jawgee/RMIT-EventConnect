import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons,
} from '@ionic/react';
import { pushPage } from '../App';
import Input from '../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { editUser } from '../data/accounts';
import { useState } from 'react';
import { setProfileInfo } from '../data/profileReducer';

const ProfileEdit = () => {
    const userInfo = useAppSelector((state) => state.value);
    const { control, handleSubmit } = useForm({ defaultValues: userInfo });
    const router = useIonRouter();

    const dispatch = useAppDispatch();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (data: any) => {
        editUser(data.id, data).then((e) => {
            // Get the information from the backend
            const [successful, message] = e;

            // If there were no issues
            if (successful) {
                // Change the userinfo
                dispatch(
                    setProfileInfo({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        profile: data.profile,
                        id: data.id,
                    })
                );
                // Send the user to the home page
                router.goBack();
            } else {
                // Set an error to show on the page
                setErrorMessage(message);
            }
        });
    };

    const profileFields = [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            max: 45,
        },
        {
            label: 'First Name',
            name: 'first_name',
        },
        {
            label: 'Last Name',
            name: 'last_name',
        },
        {
            // TODO: Get the options from the backend
            // And change this from raw input
            // Into a selection with aforementioned options
            label: 'Profile',
            name: 'profile',
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonList>
                        <Controller
                            // console.log(field);
                            render={({ field }) => (
                                <input onChange={field.onChange} value={field.value} type="hidden" />
                            )}
                            name="id"
                            control={control}
                        />
                        {profileFields.map((field, index) => (
                            <Input {...field} control={control} key={index} />
                        ))}
                        <IonItem>
                            <IonButton onClick={() => pushPage('profile/tags', router)}>Click to edit tags</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonButton type="submit">Submit</IonButton>
                        </IonItem>
                    </IonList>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ProfileEdit;
