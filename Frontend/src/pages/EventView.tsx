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
    IonChip,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { AnimatePresence, motion } from 'framer-motion';
import { EventInfo, clearEventInfo } from '../data/eventReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import '../styles/HomePractice.css';
import { useEffect, useLayoutEffect } from 'react';
import { calendar } from 'ionicons/icons';
import { pushPage } from '../App';

const EventView = () => {
    const dispatch = useAppDispatch();
    const selectedPost = useAppSelector((state) => state.event.value);
    const getTagsFromObject = (object: EventInfo) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (({ name, description, id, location, owner, image, ...o }) => o)(object);
    };

    // useEffect(() => {
    //     console.log(selectedPost);
    //     return () => {
    //         // dispatch(clearEventInfo());
    //     };
    // }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="medium">
                    <IonTitle>Event - {selectedPost.name ?? 'Event'}</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton onClick={() => pushPage('home/calendar', router)}>
                            <IonIcon className="calendar-icon-size" icon={calendar}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {selectedPost.image ?? 'nothing'}
                {/* <AnimatePresence> */}
                {selectedPost && (
                    // <motion.
                    <div
                        className="popup-container"
                        // onClick={() => setSelectedPost(undefined)}
                        // layoutId={'card-' + selectedPost.id}
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                    >
                        {/* <motion.div layoutId={'image-container' + selectedPost.id}> */}
                        <IonImg src={selectedPost.image} />
                        {/* </motion.div> */}
                        {/* <motion.div
                                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                                animate={{
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    transitionDuration: '0.5s',
                                    transitionDelay: '0.15s',
                                }}
                            > */}
                        <h1 className="event-title">{selectedPost.name}</h1>
                        {/* </motion.div>
                            <motion.div
                                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                                animate={{
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    transitionDuration: '0.5s',
                                    transitionDelay: '0.2s',
                                }}
                            > */}
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
                                {/* <IonItem> */}
                                    <h2 className="description-location">Description </h2> 
                                    <h2 className="selectpost-padding">{selectedPost.description}</h2>
                                {/* </IonItem> */}
                                {/* <IonItem> */}
                                    <h2 className="description-location">Location </h2>
                                    <h2 className="selectpost-padding">{selectedPost.location}</h2>
                                {/* </IonItem> */}
                            </IonList>

                            <IonList>
                                {Object.keys(getTagsFromObject(selectedPost)).map((e, i) => (
                                    <IonItem key={i}>
                                        <IonChip className="selected-post">
                                            <p className="selectedpost-e">{e}: {selectedPost[e]}</p>
                                        </IonChip>
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonText>
                        {/* </motion.div> */}
                        {/* </motion.div> */}
                    </div>
                )}
                {/* </AnimatePresence> */}
            </IonContent>
        </IonPage>
    );
};

export default EventView;
