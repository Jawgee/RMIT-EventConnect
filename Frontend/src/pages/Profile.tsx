import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
const Profile = lazy(() => import('../components/Profile'));

const ProfilePage: React.FC<{
    logout: () => void;
    user: string;
    setID: React.Dispatch<React.SetStateAction<number>>;
}> = ({ logout, user, setID }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Suspense fallback={<LoadingSpinner />}>
                    <Profile logout={logout} user={user} setID={setID} />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
