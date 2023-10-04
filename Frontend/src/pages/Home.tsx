import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    // IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonImg,
    IonText,
    IonChip,
    IonButtons,
    IonButton,
    IonIcon,
    useIonRouter,
    IonBackButton,
} from '@ionic/react';
import { calendar } from 'ionicons/icons';
import { pushPage } from '../App';
// import './Home.css';
import '../styles/testing.css';

const Home: React.FC = () => {
    const router = useIonRouter();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Home</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => pushPage('home/calendar', router)}>
                            <IonIcon icon={calendar}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                {/* <IonToolbar><IonSearchbar></IonSearchbar></IonToolbar> */}
            </IonHeader>

            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonImg src="" />
                        {/* ^^^ not sure how to add image source */}
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
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Home;
