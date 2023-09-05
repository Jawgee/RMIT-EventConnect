import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Tab2.css';

const Tab2: React.FC = () => {
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
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
