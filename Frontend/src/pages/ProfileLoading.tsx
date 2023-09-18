import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonLoading,
    useIonLoading,
    IonSpinner,
} from '@ionic/react';
import { replacePage } from '../App';
import { getUserInfo } from '../data/accounts';
import { useEffect, useState } from 'react';
import { UserInfo, defaultInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
// import './Tab2.css';

// import { useLocation } from 'react-router';

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
            id: info.id,
        };
        return newInfo;
    }
};

const ProfileLoading: React.FC<{
    user: string;
}> = ({ user }) => {
    // const { key } = useLocation();
    const dispatch = useAppDispatch();
    const router = useIonRouter();
    useEffect(() => {
        getInfo(user).then((e) => {
            dispatch(setProfileInfo(e));
            replacePage('profile/info', router);
        });
    }, []);

    // useEffect(() => replacePage('profile/info', router), [key]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Loading</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSpinner name="dots"></IonSpinner>
            </IonContent>
        </IonPage>
    );
};

export default ProfileLoading;
