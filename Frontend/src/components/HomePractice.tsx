import {
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar,
    IonCard,
    IonCardContent,
    IonImg,
    IonText,
    // IonContent,
    IonList,
    IonItem,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import { Navigation, Pagination } from 'swiper/modules';

import '@ionic/react/css/ionic-swiper.css';

import { AnimatePresence, motion } from 'framer-motion';
import './HomePractice.css';
import { getEvents } from '../data/events';

// interface Post {
//     id: string;
//     image: string;
//     name: string;
//     description?: string;
// }

const defaultImage = 'https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4.jpg';

const HomePractice: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<any | undefined>(undefined);

    // Tag info
    const [posts, setPosts] = useState<any[]>([]);

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        getEvents().then((e) => {
            if (typeof e === 'string') {
                // Do something to show that something went wrong
                setErrorMessage(e);
            } else {
                console.log(e);
                // send tags info somewhere
                setPosts(e);
            }
        });
    }, []);

    const getTagsFromObject = (object: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (({ name, description, id, location, owner, index, ...o }) => o)(object);
    };
    return (
        <>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="content-container">
                <div style={{ display: 'block' }}>
                    <Swiper slidesPerView={1.25} spaceBetween={20}>
                        {posts.map((post, index) => (
                            <SwiperSlide key={'card-' + index} className="ion-no-padding ion-no-inner-padding">
                                <IonCard
                                    className="ion-no-padding"
                                    onClick={() => setSelectedPost({ ...post, index: index })}
                                >
                                    <motion.div className="card-content" layoutId={'card-' + index}>
                                        <motion.div layoutId={'image-container' + index}>
                                            <IonImg className="card-image" src={post.image ?? defaultImage} />
                                        </motion.div>
                                        <IonCardContent>
                                            <motion.div
                                                className="title-container"
                                                variants={{
                                                    show: {
                                                        opacity: 1,
                                                        transition: {
                                                            duration: 0.5,
                                                            delay: 0.3,
                                                        },
                                                    },
                                                    hidden: {
                                                        opacity: 0,
                                                        transition: {
                                                            duration: 0.1,
                                                        },
                                                    },
                                                }}
                                                initial="show"
                                                animate={selectedPost?.index === index ? 'hidden' : 'show'}
                                            >
                                                <IonText>{post.name}</IonText>
                                            </motion.div>
                                        </IonCardContent>
                                    </motion.div>
                                </IonCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <AnimatePresence>
                    {selectedPost && (
                        <motion.div
                            className="popup-container"
                            onClick={() => setSelectedPost(undefined)}
                            layoutId={'card-' + selectedPost.index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div layoutId={'image-container' + selectedPost.index}>
                                <IonImg src={selectedPost.image ?? defaultImage} />
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
                                            <p>Description: {selectedPost.location}</p>
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
            </div>
        </>
    );
};

export default HomePractice;
