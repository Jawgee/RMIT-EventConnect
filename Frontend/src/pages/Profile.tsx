import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar /*, useIonRouter*/ } from '@ionic/react';
// import './Tab2.css';

const Profile: React.FC<{ logout: Function }> = ({ logout }) => {
    // const router = useIonRouter();

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
                {/* TODO: redirect to /login after logging out, or implement that into logout function (probably the former) */}
                <button onClick={() => logout()}>Log out</button>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
