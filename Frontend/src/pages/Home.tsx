import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    // IonSearchbar
} from '@ionic/react';
import '../styles/testing.css';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
const HomePractice = lazy(() => import('../components/HomePractice'));

const Home: React.FC = () => {
    // const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
                {/* <IonToolbar>
                    <IonSearchbar></IonSearchbar>
                </IonToolbar> */}
            </IonHeader>

            <IonContent fullscreen>
                {/* <IonCard>
                    <IonCardHeader>
                        <IonImg src="" />
                        {/* ^^^ not sure how to add image source *}
                        <IonCardTitle>Live Festival!</IonCardTitle>
                        <IonCardSubtitle>Location: </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </IonCardContent>
                </IonCard>

                <IonText>
                    related to <IonChip color="secondary">#XXXXX</IonChip>
                </IonText>

                <IonCard>
                    <IonCardHeader>
                        <IonImg src="" />
                        <IonCardTitle>Live Festival!</IonCardTitle>
                        <IonCardSubtitle>Location: </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </IonCardContent>
                </IonCard> */}
                <Suspense fallback={<LoadingSpinner />}>
                    {/* <ProfileOptions control={control} /> */}
                    <HomePractice />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};

export default Home;
