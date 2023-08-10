import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/react';
// import './Login.css';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        // Sets value of changed element in the user state
        const tmp = { ...user };
        tmp[e.target.label.toLowerCase()] = e.target.value;
        setUser(tmp);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <IonInput label="Email" type="email" labelPlacement="floating" value={user.email} onIonChange={handleChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput label="Password" type="password" labelPlacement="floating" value={user.password} onIonChange={handleChange}></IonInput>
                    </IonItem>
                    <IonButton onClick={e => console.log(user)}>Login</IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Login;
