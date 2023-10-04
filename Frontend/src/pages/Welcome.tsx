import { IonContent, IonPage, IonButton, useIonRouter, IonImg } from '@ionic/react';
import { pushPage } from '../App';
import '../styles/Welcome.css';

const Welcome = () => {
    // Routing to allow to manually redirect the user
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent className="whole-background" fullscreen>
                <div className="container">
                    <div className="top-image">
                        <div>
                            <IonImg src="../src/images/innovent.png" alt="Innovent Logo"></IonImg>
                        </div>
                    </div>
                    {/* Link to login page */}
                    <div className="middle-buttons1">
                        <IonButton className="login-button" onClick={() => pushPage('login', router)}>
                            Log In
                        </IonButton>
                    </div>
                    <div className="middle-buttons2">
                        <IonButton className="signup-button" onClick={() => pushPage('register', router)}>
                            Sign Up
                        </IonButton>
                    </div>
                    <div className="bottom-image">
                        <IonImg src="../src/images/innobound.png" alt="Innobound Logo"></IonImg>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;
