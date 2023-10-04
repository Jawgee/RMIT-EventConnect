import {
    IonImg,
    IonText,
    IonList,
    IonItem,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
} from '@ionic/react';
import { AnimatePresence, motion } from 'framer-motion';
import { EventInfo } from '../data/eventReducer';
import { useAppSelector } from '../hooks';
import '../styles/HomePractice.css';

const EventView = () => {
    const selectedPost = useAppSelector((state) => state.event.value);
    const getTagsFromObject = (object: EventInfo) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (({ name, description, id, location, owner, image, ...o }) => o)(object);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Event - {selectedPost.name}</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {selectedPost.image ?? 'nothing'}
                <AnimatePresence>
                    {selectedPost && (
                        <motion.div
                            className="popup-container"
                            // onClick={() => setSelectedPost(undefined)}
                            layoutId={'card-' + selectedPost.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div layoutId={'image-container' + selectedPost.id}>
                                <IonImg src={selectedPost.image} />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                                animate={{
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    transitionDuration: '0.5s',
                                    transitionDelay: '0.15s',
                                }}
                            >
                                <h1>{selectedPost.name}</h1>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                                animate={{
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    transitionDuration: '0.5s',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <IonText>
                                    {/* <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </p> */}
                                    <IonList>
                                        <IonItem>
                                            <p>Description: {selectedPost.description}</p>
                                        </IonItem>
                                        <IonItem>
                                            <p>Location: {selectedPost.location}</p>
                                        </IonItem>
                                        {Object.keys(getTagsFromObject(selectedPost)).map((e, i) => (
                                            <IonItem key={i}>
                                                <p>
                                                    {e}: {selectedPost[e]}
                                                </p>
                                            </IonItem>
                                        ))}
                                    </IonList>
                                </IonText>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </IonContent>
        </IonPage>
    );
};

export default EventView;
