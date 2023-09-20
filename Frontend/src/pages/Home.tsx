import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import './testing.css';
import { pushPage } from '../App';

const Tab1: React.FC = () => {
    const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <p>TODO: Add stuff here</p>
                <IonButton onClick={() => pushPage('tags', router)}>tags</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
