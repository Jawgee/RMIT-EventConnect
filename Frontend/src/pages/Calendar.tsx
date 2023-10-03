import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Calendar: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Calendar</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <p>TODO: Add stuff here</p>
            </IonContent>
        </IonPage>
    );
};

export default Calendar;
