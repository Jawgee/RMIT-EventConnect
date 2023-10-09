import { useIonRouter, IonList, IonItem, IonLabel, IonButton, IonText, IonIcon } from '@ionic/react';
import { pushPage, replacePage } from '../App';
import { UserInfo, clearProfileInfo, defaultProfileInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserInfo } from '../data/accounts';
import { useEffect } from 'react';
import '../styles/Profile.css';
import { personCircle } from 'ionicons/icons';

const Profile: React.FC<{
    logout: () => void;
    user: string;
    setID: (user?: string, id?: number) => void;
}> = ({ logout, user, setID }) => {
    const userInfo = useAppSelector((state) => state.profile.value);
    const router = useIonRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check if the user information has already been gotten
        if (!userInfo.email) {
            // Get info from the backend
            getUserInfo(user).then((e) => {
                if (typeof e === 'string') {
                    // Do something to show that something went wrong
                    return defaultProfileInfo;
                } else {
                    const newInfo: UserInfo = {
                        first_name: e.first_name,
                        last_name: e.last_name,
                        email: e.email,
                        profile: e.profile,
                        id: e.id,
                    };
                    // Send info
                    dispatch(setProfileInfo(newInfo));
                    // Set ID in the localstorage and through the app
                    setID(undefined, newInfo.id);
                }
            });
        }
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
        <div className="profile-container">
            <div className="icon-container">
                <div className="card">
                    <div className="header">
                        <div className="avatar icon-container">
                            <IonIcon className="avatar-icon" icon={personCircle} color="tertiary"></IonIcon>
                        </div>
                    </div>
                </div>
            </div>

            <IonList className="list-container">
                {profileFields.map((field, index) => (
                    <IonItem key={index}>
                        <IonItem>
                            <IonLabel>{field.label}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonText>{field.value}</IonText>
                        </IonItem>
                    </IonItem>
                ))}
            </IonList>

            <div className="button-container">
                <IonButton
                    className="profile-button"
                    shape="round"
                    color="primary"
                    fill="solid"
                    type="submit"
                    onClick={() => pushPage('profile/edit', router)}
                >
                    Edit
                </IonButton>
                <IonButton
                    className="profile-button"
                    shape="round"
                    color="secondary"
                    fill="solid"
                    type="submit"
                    onClick={onLogoutClick}
                >
                    Log out
                </IonButton>
            </div>
        </div>
    );
};

export default Profile;
