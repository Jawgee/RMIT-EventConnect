import { IonCard, IonCardContent, IonImg, IonText, useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import { Navigation, Pagination } from 'swiper/modules';

import '@ionic/react/css/ionic-swiper.css';

// import { motion } from 'framer-motion';
import '../styles/HomePractice.css';
import { getEvents } from '../data/events';
import { pushPage } from '../App';
import { useAppDispatch } from '../hooks';
import { EventInfo, clearEventInfo, defaultEventInfo, setEventInfo } from '../data/eventReducer';

const AllEvents: React.FC = () => {
    const dispatch = useAppDispatch();

    // Post info
    const [posts, setPosts] = useState<any[]>([]);
    const router = useIonRouter();

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(clearEventInfo());
        getEvents().then((e) => {
            if (typeof e === 'string') {
                // Do something to show that something went wrong
                setErrorMessage(e);
            } else {
                // send tags info somewhere
                const newInfo: EventInfo[] = [];
                e.forEach((n: any) => {
                    const info: EventInfo = {
                        name: n.name,
                        description: n.description,
                        location: n.location,
                        owner: n.owner,
                        image: n.image,
                        ...n,
                    };
                    newInfo.push(info);
                });
                setPosts(newInfo);
            }
        });
    }, []);

    return (
        <>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="content-container">
                <div style={{ display: 'block' }}>
                    <h3>{posts.length === 0 ? 'No events currently exist' : 'All current events'}</h3>
                    <Swiper slidesPerView={1.25} spaceBetween={20}>
                        {posts.map((post, index) => (
                            <SwiperSlide key={'card-' + index} className="ion-no-padding ion-no-inner-padding">
                                <IonCard
                                    className="ion-no-padding"
                                    onClick={() => {
                                        dispatch(setEventInfo(post));
                                        pushPage('home/event', router);
                                    }}
                                >
                                    {/* <motion. */}
                                    <div
                                        className="card-content"
                                        // layoutId={'card-' + index}
                                    >
                                        {/* <motion. */}
                                        <div
                                        // layoutId={'image-container' + index}
                                        >
                                            <IonImg className="card-image" src={post.image ?? defaultEventInfo.image} />
                                            {/* </motion.div> */}
                                        </div>
                                        <IonCardContent>
                                            {/* <motion. */}
                                            <div
                                                className="title-container"
                                                // variants={{
                                                //     show: {
                                                //         opacity: 1,
                                                //         transition: {
                                                //             duration: 0.5,
                                                //             delay: 0.3,
                                                //         },
                                                //     },
                                                //     hidden: {
                                                //         opacity: 0,
                                                //         transition: {
                                                //             duration: 0.1,
                                                //         },
                                                //     },
                                                // }}
                                                // initial="show"
                                                // animate={selectedPost?.index === index ? 'hidden' : 'show'}
                                            >
                                                <IonText>{post.name}</IonText>
                                                {/* </motion.div> */}
                                            </div>
                                        </IonCardContent>
                                        {/* </motion.div> */}
                                    </div>
                                </IonCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default AllEvents;
