import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonImg,
    IonText,
    IonChip,
    IonList,
} from '@ionic/react';
// import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar></IonSearchbar>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home here</IonTitle>
                    </IonToolbar>
                </IonHeader>

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

                <p>TODO: Add stuff here</p>
            </IonContent>
        </IonPage>
    );
};

export default Home;
