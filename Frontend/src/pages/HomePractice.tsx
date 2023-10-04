import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonImg,
    IonText,
    IonContent,
} from '@ionic/react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import { Navigation, Pagination } from 'swiper/modules';

import '@ionic/react/css/ionic-swiper.css';

import { AnimatePresence, motion } from 'framer-motion';
import '../styles/HomePractice.css';

interface Post {
    id: string;
    image: string;
    name: string;
    description?: string;
}

const HomePractice: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

    const posts: Post[] = [
        {
            id: '1',
            image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
            name: 'Cruises are sailing again',
        },
        {
            id: '2',
            image: 'https://images.unsplash.com/photo-1512649408904-c0a00fb810da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80',
            name: 'Things to do when visiting Bali',
        },
        {
            id: '3',
            image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80',
            name: '10 Best Islands to travel to in 2022',
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Blog Posts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="content-container">
                    <div style={{ display: 'block' }}>
                        <Swiper slidesPerView={2.15} spaceBetween={50}>
                            {posts.map((post, index) => (
                                <SwiperSlide key={'card-' + index} className="ion-no-padding ion-no-inner-padding">
                                    <IonCard className="ion-no-padding" onClick={() => setSelectedPost(post)}>
                                        <motion.div className="card-content" layoutId={'card-' + post.id}>
                                            <motion.div layoutId={'image-container' + post.id}>
                                                <IonImg className="card-image" src={post.image} />
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
                                                    animate={selectedPost?.id === post.id ? 'hidden' : 'show'}
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
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                    </IonText>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomePractice;
