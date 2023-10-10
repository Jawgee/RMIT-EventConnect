import { IonGrid, IonSpinner } from '@ionic/react';

const LoadingSpinner = () => (
    <IonGrid className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
        <IonSpinner name="dots" style={{ transform: 'scale(3)' }}></IonSpinner>
    </IonGrid>
);

export default LoadingSpinner;
