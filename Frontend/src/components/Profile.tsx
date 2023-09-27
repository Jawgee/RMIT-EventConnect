import { useIonRouter, IonList, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import { pushPage, replacePage } from '../App';
import { UserInfo, clearProfileInfo, defaultInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserInfo } from '../data/accounts';
import { useEffect } from 'react';

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

const Profile: React.FC<{
    logout: () => void;
    user: string;
    setID: React.Dispatch<React.SetStateAction<number>>;
}> = ({ logout, user, setID }) => {
    const userInfo = useAppSelector((state) => state.value);
    const router = useIonRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getInfo(user).then((e) => {
            dispatch(setProfileInfo(e));
            setID(e.id ?? 0);
        });
    }, []);

    const onLogoutClick = () => {
        // redirect to /welcome after logging out
        logout();
        dispatch(clearProfileInfo());
        replacePage('welcome', router);
    };

    const profileFields = [
        {
            label: 'Email',
            value: userInfo.email,
        },
        {
            label: 'First Name',
            value: userInfo.first_name,
        },
        {
            label: 'Last Name',
            value: userInfo.last_name,
        },
        {
            label: 'Profile',
            value: userInfo.profile,
        },
    ];

    return (
        <IonList>
            {profileFields.map((field, index) => (
                <IonItem key={index}>
                    <IonLabel>{field.label}</IonLabel>
                    <IonText>{field.value}</IonText>
                </IonItem>
            ))}
            <IonItem>
                <IonButton onClick={() => pushPage('profile/edit', router)}>Edit</IonButton>
            </IonItem>
            <IonItem>
                <IonButton onClick={onLogoutClick}>Log out</IonButton>
            </IonItem>
        </IonList>
    );
};

export default Profile;
