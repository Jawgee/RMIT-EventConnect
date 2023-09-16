import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import './Tab1.css';
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home here</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>TODO: Add stuff here</p>
                {/* <IonButton
                    onClick={() => {
                        toPage('profile', router);
                    }}
                > 
                    test
                </IonButton>*/}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
