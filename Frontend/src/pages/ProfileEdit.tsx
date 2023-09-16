import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
    IonItem,
    //   IonLabel,
    IonButton,
} from '@ionic/react';
import { toPage } from '../App';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
// import './Tab2.css';

// TODO: Most likely have the "Profile" page send through the information
const ProfileEdit = () => {
    // TODO: Get info from the backend and then make default info to put into the useForm
    const { control, handleSubmit } = useForm();
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
            label: 'Tags',
            name: 'tags',
            // TODO: Change this to instead just link to the add/edit tags page
            // TODO: make aforementioned page
        },
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
