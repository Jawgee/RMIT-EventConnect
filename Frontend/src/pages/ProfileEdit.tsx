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

const ProfileEdit = () => {
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
                            <IonButton
                                onClick={() => {
                                    toPage('/profile', router);
                                }}
                            >
                                Return
                            </IonButton>
                        </IonItem>
                    </IonList>
                </form>
                <IonButton>Return</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ProfileEdit;
