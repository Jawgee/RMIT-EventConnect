import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter, IonLoading } from '@ionic/react';
import { toPage } from '../App';
import { getUserInfo } from '../data/accounts';
import { useEffect } from 'react';
import { UserInfo, defaultInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
// import './Tab2.css';

export const getInfo = async (user: string) => {
    const info = await getUserInfo(user);
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
};

const ProfileLoading: React.FC<{
    user: string;
}> = ({ user }) => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();
    useEffect(() => {
        getInfo(user).then((e) => {
            dispatch(setProfileInfo(e));
            toPage('profile', router);
        });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Loading</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading />
            </IonContent>
        </IonPage>
    );
};

export default ProfileLoading;
