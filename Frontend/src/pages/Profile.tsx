import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
} from '@ionic/react';
import { toPage } from '../App';
import { getUserInfo, test } from '../data/accounts';
import { CapacitorCookies } from '@capacitor/core';
import { useEffect, useState } from 'react';
// import './Tab2.css';

interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    profile: string;
}

const defaultInfo: UserInfo = {
    first_name: '',
    last_name: '',
    email: '',
    profile: '',
};

const getInfo = (user: string) => {
    return getUserInfo(user).then((info) => {
        if (typeof info === 'string') {
            // Do something to show that something went wrong
            return defaultInfo;
        } else {
            let newInfo: UserInfo = {
                first_name: info.first_name,
                last_name: info.last_name,
                email: info.email,
                profile: info.profile,
            };
            return newInfo;
        }
    });
};

const Profile: React.FC<{
    logout: () => void;
    user: string;
}> = ({ logout, user }) => {
    let [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    useEffect(() => {
        getInfo(user).then((e) => setUserInfo(e));
    }, []);
    const router = useIonRouter();

    const onLogoutClick = () => {
        // redirect to /login after logging out
        logout();
        toPage('login', router);
    };

    const profileFields = [
        {
            label: 'Email',
            value: userInfo?.email,
        },
        {
            label: 'First Name',
            value: userInfo?.first_name,
        },
        {
            label: 'Last Name',
            value: userInfo?.last_name,
        },
        {
            label: 'Profile',
            value: userInfo?.profile,
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {profileFields.map((field, index) => (
                        <IonItem key={index}>
                            <IonLabel>{field.label}</IonLabel>
                            <IonText>{field.value}</IonText>
                        </IonItem>
                    ))}
                    <IonItem>
                        <IonButton onClick={() => toPage('profile/edit', router, false)}>Edit</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={onLogoutClick}>Log out</IonButton>
                    </IonItem>
                    {/* <IonItem>
                        <IonButton onClick={(e) => }>test</IonButton>
                    </IonItem> */}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
