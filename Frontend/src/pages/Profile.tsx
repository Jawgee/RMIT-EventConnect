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
} from '@ionic/react';
import { toPage } from '../App';
// import './Tab2.css';

const Profile: React.FC<{ logout: () => void }> = ({ logout }) => {
    const router = useIonRouter();

    const onLogoutClick = () => {
        // redirect to /login after logging out
        logout();
        toPage('/login', router);
    };

    const profileFields = [
        {
            label: 'Email',
        },
        {
            label: 'First Name',
        },
        {
            label: 'Last Name',
        },
        {
            label: 'Tags',
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
                        <IonItem>
                            <IonLabel key={index}>{field.label}</IonLabel>
                        </IonItem>
                    ))}
                    <IonItem>
                        <IonButton onClick={onLogoutClick}>Log out</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
