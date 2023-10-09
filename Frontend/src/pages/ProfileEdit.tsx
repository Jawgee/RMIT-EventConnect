import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
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
import '../styles/ProfileEdit.css';

const ProfileEdit = () => {
    const userInfo = useAppSelector((state) => state.value);
    const { control, handleSubmit } = useForm({ defaultValues: userInfo });
    const router = useIonRouter();

    const dispatch = useAppDispatch();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (data: any) => {
        editUser(data.id, data.email, data.first_name, data.last_name, data.profile).then((e) => {
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
                    <IonTitle>Edit Profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <form className="edit-profile-container" onSubmit={handleSubmit(onSubmit)}>
                    <div className="edit-profile-header">
                        <IonHeader className="ion-no-border">
                            <IonTitle className="edit-profile-title">Edit Profile Here!</IonTitle>
                        </IonHeader>
                    </div>

                    <IonList className="edit-list-container">
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
                    </IonList>

                    <div className="edit-button-container">
                        <IonButton
                            className="edit-profile-button"
                            shape="round"
                            color="primary"
                            fill="solid"
                            onClick={() => pushPage('profile/tags', router)}
                        >
                            Click to edit tags
                        </IonButton>

                        <IonButton
                            className="submit-profile-button"
                            shape="round"
                            color="secondary"
                            fill="solid"
                            type="submit"
                        >
                            Submit
                        </IonButton>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ProfileEdit;
