import { useEffect, useState } from 'react';
import { getTags } from '../data/events';
import SelectInput from './SelectInput';
import { Control } from 'react-hook-form';

const getInfo = async () => {
    return await getTags();
};

const EventAddTags: React.FC<{ control: Control<any> }> = ({ control }) => {
    // Tag info
    const [tags, setTags] = useState<any[]>([]);

    // Used for error message handling
    // When there was a fail from the backend
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        getInfo().then((e) => {
            if (typeof e === 'string') {
                // Do something to show that something went wrong
                setErrorMessage(e);
            } else {
                // send tags info somewhere
                setTags(e);
            }
        });
    }, []);

    return (
        <>
            {tags &&
                Object.keys(tags).map((element, index) => {
                    //@ts-ignore
                    const e = tags[element];
                    return (
                        <SelectInput
                            control={control}
                            key={index}
                            options={e.tags}
                            placeholder={'Select an option'}
                            label={element}
                        />
                    );
                })}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
};

export default EventAddTags;
