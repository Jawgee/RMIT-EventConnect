import { useEffect, useState } from 'react';
import { getTags, updateTags } from '../data/accounts';
import { IonButton, IonCard, IonCheckbox, IonHeader, IonTitle, useIonRouter } from '@ionic/react';
import './Tags.css';
import { replacePage } from '../App';

const getInfo = async (id: number) => {
    const info = await getTags(id);
    if (typeof info === 'string') {
        // Do something to show that something went wrong
        return {};
    } else {
        return info;
    }
};
const Tags: React.FC<{
    id: number;
}> = ({ id }) => {
    const [tags, setTags] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState('');
    const router = useIonRouter();
    useEffect(() => {
        getInfo(id).then((e) => {
            if (typeof e === 'string') {
                // Do something to show that something went wrong
                return {};
            } else {
                // send tags info somewhere
                setTags(e);
            }
        });
    }, []);

    const invertSelection = (key: string, value: number) => {
        const tmp = tags;
        tmp[key] = value === 0 ? 1 : 0;
        setTags(tmp);
    };

    const submitTags = () => {
        updateTags(id, tags).then((e) => {
            const [successful, message] = e;
            if (successful) {
                if (router.canGoBack()) {
                    router.goBack();
                } else {
                    replacePage('home', router);
                }
            } else {
                // Set an error to show on the page
                setErrorMessage(message);
            }
        });
    };

    return (
            <>  
                <div className='tags-container'>
                    <div className='tags-header'>
                        <IonHeader className="ion-no-border">
                            <IonTitle className="tags-ion-title">Select your relevant tags!</IonTitle>
                        </IonHeader>
                    </div>
                    <div className='tags-tags'>
                        <IonCard className='tags-card'>
                            {tags &&
                                Object.keys(tags).map((key, i) => {
                                    // console.log(key, tags[key]);
                                    return (
                                        
                                            <IonCheckbox
                                                key={i}
                                                checked={tags[key]}
                                                onIonChange={() => invertSelection(key, tags[key])}
                                                style={{ textTransform: 'capitalize', textAlign: "center" }}

                                                // labelPlacement='fixed'
                                            >
                                                {key.replace('_', ' ')}
                                            </IonCheckbox>
                                        
                                    );
                                })}
                        </IonCard>
                    </div>
                        <div className='tags-button'>
                            <IonButton shape="round"
                                color="primary"
                                fill="solid" onClick={submitTags}>Submit Tags</IonButton>
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                </div>
            </>
    );
};

export default Tags;
