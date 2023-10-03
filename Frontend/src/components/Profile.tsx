import { useIonRouter, IonList, IonItem, IonLabel, IonButton, IonText, IonIcon } from '@ionic/react';
import { pushPage, replacePage } from '../App';
import { UserInfo, clearProfileInfo, defaultInfo, setProfileInfo } from '../data/profileReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserInfo } from '../data/accounts';
import { useEffect } from 'react';
import './Profile.css';
import { personCircle } from 'ionicons/icons';

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
            setID(e.id);
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
        <div className="profile-container">
            {/* <IonCard> */}
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
                            <IonButton className="profile-button" shape="round" color="primary" fill="solid" type="submit" onClick={() => pushPage('profile/edit', router)}>
                                Edit
                            </IonButton>     
                            <IonButton className="profile-button" shape="round" color="secondary" fill="solid" type="submit" onClick={onLogoutClick}>
                                Log out
                            </IonButton>         
                        </div> 
                 
            {/* </IonCard> */}
        </div>
    );
};

export default Profile;
