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
} from '@ionic/react';
import { toPage } from '../App';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../hooks';
// import './Tab2.css';

// TODO: Most likely have the "Profile" page send through the information
const ProfileEdit = () => {
    // TODO: Get info from the backend and then make default info to put into the useForm
    const userInfo = useAppSelector((state) => state.value);
    const { control, handleSubmit } = useForm({ defaultValues: userInfo });
    const router = useIonRouter();

    const onSubmit = () => {
        // TODO: do something here
        toPage('/profile', router);
    };

    const profileFields = [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
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
            label: 'Profile',
            name: 'profile',
        },
        // TODO: Create link to tag edit page
        // TODO: make aforementioned page
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonList>
                        {profileFields.map((field, index) => (
                            <Input {...field} control={control} key={index} />
                        ))}
                        <IonItem>
                            <IonButton>Click to edit tags</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonButton type="submit">Submit</IonButton>
                        </IonItem>
                    </IonList>
                </form>
                <IonButton
                    onClick={() => {
                        toPage('profile', router);
                    }}
                >
                    Return
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ProfileEdit;
