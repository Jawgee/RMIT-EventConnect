import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCol, IonGrid, IonRow, IonImg } from '@ionic/react';
// import './Register.css';
import { toPage } from '../App';
import "../components/Welcome.css";

const Register = () => {
    // Routing to allow to manually redirect the user
    const router = useIonRouter();

    // TODO: Create proper design
    return (
        <IonPage>
            <IonContent className="whole-background" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="primary">
                        <IonTitle size="large">Welcome</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="innovent-img">
                    <IonImg style={{width: "40%", margin: "200px auto auto auto"}}
                        src="../src/images/innovent.png"
                        alt="Innovent Logo"
                    ></IonImg>
                </div>
                {/* Link to login page */}
                <div style={{margin:"auto auto 200px auto"}}></div>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="auto"><IonButton className="login-button" onClick={() => toPage('login', router)}>Log In</IonButton></IonCol>
                        <IonCol size="auto"><IonButton className="signup-button" onClick={() => toPage('register', router)}>Sign Up</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <div style={{margin:"auto auto 180px auto"}}></div>
                <IonImg style={{width: "40%", margin: "auto"}}
                    src="../src/images/innobound.png"
                    alt="Innobound Logo"
                ></IonImg>
                
                
            </IonContent>
        </IonPage>
    );
};

export default Register;
