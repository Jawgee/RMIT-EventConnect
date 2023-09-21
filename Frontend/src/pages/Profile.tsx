import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { toPage } from '../App';
// import './Tab2.css';

const Profile: React.FC<{ logout: Function }> = ({ logout }) => {
    const router = useIonRouter();

    const onLogoutClick = () => {
        // redirect to /welcome after logging out
        logout();
        toPage('welcome', router);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>TODO: Add stuff here</p>
                <button onClick={onLogoutClick}>Log out</button>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
