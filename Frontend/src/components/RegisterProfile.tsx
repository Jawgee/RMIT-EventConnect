import { useEffect, useState } from 'react';
import { getProfile } from '../data/events';
import SelectInput from './SelectInput';
import { Control } from 'react-hook-form';

const getInfo = async () => {
    return await getProfile();
};

const RegisterProfile: React.FC<{ control: Control<any> }> = ({ control }) => {
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
            {tags && (
                <SelectInput control={control} options={tags} placeholder={'Select an option'} label={'Profile'} />
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
};

export default RegisterProfile;
