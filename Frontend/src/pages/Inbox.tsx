import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';

// This page is not complete. It auto-redirects back to Home.
const Inbox: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="medium">
                    <IonTitle>Inbox</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Redirect to="/home" />
            </IonContent>
        </IonPage>
    );
};

export default Inbox;
