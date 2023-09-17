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
                <IonGrid class="ion-justify-content-center">
                    {/* <IonCol> */}
                    <IonRow></IonRow>
                    <IonRow></IonRow>
                    <IonRow>
                        <IonButton className="testing-button" color="secondary" shape="round">
                            test
                        </IonButton>
                        <IonButton color="secondary">test</IonButton>
                    </IonRow>
                    {/* </IonCol> */}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
