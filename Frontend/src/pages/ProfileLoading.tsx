import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter, IonSpinner } from '@ionic/react';
import { replacePage } from '../App';
import { getUserInfo } from '../data/accounts';
import { useEffect } from 'react';
import { UserInfo, defaultInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch } from '../hooks';
// import './Tab2.css';

// import { useLocation } from 'react-router';

export const getInfo = async (user: string) => {
    const info = await getUserInfo(user);
    if (typeof info === 'string') {
        // Do something to show that something went wrong
        return defaultInfo;
    } else {
        const newInfo: UserInfo = {
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
    setID: React.Dispatch<React.SetStateAction<number>>;
}> = ({ user, setID }) => {
    // const { key } = useLocation();
    const dispatch = useAppDispatch();
    const router = useIonRouter();
    useEffect(() => {
        getInfo(user).then((e) => {
            dispatch(setProfileInfo(e));
            setID(e.id);
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
