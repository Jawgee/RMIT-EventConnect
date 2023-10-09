import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    // IonSearchbar
} from '@ionic/react';
import '../styles/testing.css';
import '../styles/HomePractice.css';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
const AllEvents = lazy(() => import('../components/AllEvents'));

const Home: React.FC = () => {
    // const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="medium">
                    <IonTitle>Home</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    

                </IonToolbar>
                {/* <IonToolbar>
                    <IonSearchbar></IonSearchbar>
                </IonToolbar> */}
            </IonHeader>

            <IonContent>
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
                    <AllEvents />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};

export default Home;
