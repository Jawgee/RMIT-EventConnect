import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter } from '@ionic/react';
// import './Register.css';
import { toPage } from '../App';
import "../components/welcome.css";

const Register = () => {
    // Routing to allow to manually redirect the user
    const router = useIonRouter();

    // TODO: Create proper design
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Welcome</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Welcome</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {/* Link to login page */}
                <IonButton className="new-button" onClick={() => toPage('login', router)}>Login</IonButton>
                <IonButton className="new-button" onClick={() => toPage('register', router)}>Register</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;
