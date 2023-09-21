import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './testing.css';

const Home: React.FC = () => {
    // const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <p>TODO: Add stuff here</p>
            </IonContent>
        </IonPage>
    );
};

export default Home;
