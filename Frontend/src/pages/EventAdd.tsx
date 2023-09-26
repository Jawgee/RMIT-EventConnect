import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';
const EventAddForm = lazy(() => import('../components/EventAddForm'));

const EventAdd: React.FC<{ user: string }> = ({ user }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create an Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Suspense fallback={<LoadingSpinner />}>
                    <EventAddForm user={user} />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};

export default EventAdd;
