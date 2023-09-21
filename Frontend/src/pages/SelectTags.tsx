import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';
const Tags = lazy(() => import('../components/Tags'));

const SelectTags: React.FC<{ id: number; showBack: boolean }> = ({ id, showBack }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {showBack && (
                        <IonButtons slot="start">
                            <IonBackButton></IonBackButton>
                        </IonButtons>
                    )}
                    <IonTitle>Tags</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Suspense fallback={<LoadingSpinner />}>
                    <Tags id={id} />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};
export default SelectTags;
