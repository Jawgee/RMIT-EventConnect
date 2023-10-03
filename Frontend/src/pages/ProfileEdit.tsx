import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    IonList,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons,
} from '@ionic/react';
import { pushPage } from '../App';
import Input from '../components/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { editUser } from '../data/accounts';
import {
    // Suspense, lazy,
    useState,
} from 'react';
import { UserInfo, setProfileInfo } from '../data/profileReducer';
// import LoadingSpinner from './LoadingSpinner';
// const ProfileOptions = lazy(() => import('../components/ProfileOptions'));

const ProfileEdit = () => {
    const userInfo = useAppSelector((state) => state.value);
    const { control, handleSubmit } = useForm<UserInfo>({ defaultValues: userInfo });
    const router = useIonRouter();

    const dispatch = useAppDispatch();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<UserInfo> = (data) => {
        editUser(data.id, data).then((e) => {
            // Get the information from the backend
            const [successful, message] = e;

            // If there were no issues
            if (successful) {
                // Change the userinfo
                dispatch(
                    setProfileInfo({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        profile: data.profile,
                        id: data.id,
                    })
                );
                // Send the user to the home page
                router.goBack();
            } else {
                // Set an error to show on the page
                setErrorMessage(message);
            }
        });
    };

    const profileFields = [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            max: 45,
        },
        {
            label: 'First Name',
            name: 'first_name',
        },
        {
            label: 'Last Name',
            name: 'last_name',
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonList>
                        <Controller
                            render={({ field }) => {
                                console.log(field);
                                return <input onChange={field.onChange} value={field.value} type="hidden" />;
                            }}
                            name="id"
                            control={control}
                        />
                        {profileFields.map((field, index) => (
                            <Input {...field} control={control} key={index} />
                        ))}
                        {/* <IonItem>
                            <Suspense fallback={<LoadingSpinner />}>
                                <ProfileOptions control={control} />
                            </Suspense>
                        </IonItem> */}
                        <IonItem>
                            <IonButton onClick={() => pushPage('profile/tags', router)}>Click to edit tags</IonButton>
                        </IonItem>

                        <IonItem>
                            <IonButton type="submit">Submit</IonButton>
                        </IonItem>
                    </IonList>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ProfileEdit;
