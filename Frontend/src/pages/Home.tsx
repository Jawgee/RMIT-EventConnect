import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import './testing.css';
// import { toPage } from '../App';

const Tab1: React.FC = () => {
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

export default Tab1;
