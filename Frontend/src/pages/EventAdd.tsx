import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
// import './Tab3.css';

const Tab3: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Add Event</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>TODO: Add stuff here</p>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;
