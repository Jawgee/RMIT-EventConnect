import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
} from '@ionic/react';
import { toPage } from '../App';
import { clearProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';

const Profile: React.FC<{
    logout: () => void;
}> = ({ logout }) => {
    const userInfo = useAppSelector((state) => state.value);
    const router = useIonRouter();
    const dispatch = useAppDispatch();

    const onLogoutClick = () => {
        // redirect to /login after logging out
        logout();
        dispatch(clearProfileInfo());
        toPage('login', router);
    };

    const profileFields = [
        {
            label: 'Email',
            value: userInfo.email,
        },
        {
            label: 'First Name',
            value: userInfo.first_name,
        },
        {
            label: 'Last Name',
            value: userInfo.last_name,
        },
        {
            label: 'Profile',
            value: userInfo.profile,
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
                <IonList>
                    {profileFields.map((field, index) => (
                        <IonItem key={index}>
                            <IonLabel>{field.label}</IonLabel>
                            <IonText>{field.value}</IonText>
                        </IonItem>
                    ))}
                    <IonItem>
                        <IonButton onClick={() => toPage('profile/edit', router, false)}>Edit</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={onLogoutClick}>Log out</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
