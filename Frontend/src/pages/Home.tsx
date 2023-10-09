import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../styles/testing.css';
import '../styles/HomePractice.css';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
const AllEvents = lazy(() => import('../components/AllEvents'));

const Home: React.FC = () => {
    // const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="medium">
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <Suspense fallback={<LoadingSpinner />}>
                    <AllEvents />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};

export default Home;
