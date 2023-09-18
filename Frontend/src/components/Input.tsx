import { type FC } from 'react';
import { IonItem, IonInput } from '@ionic/react';
import { Controller, type Control } from 'react-hook-form';

export interface InputProps {
    name: string;
    control?: Control<any>;
    label?: string;
    type?: any;
    clearOnEdit?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    required?: boolean;
    helperText?: string;
}

// Default values are used here to simplify code
// Minimum length 3, Maximum length 45, Required true
const Input: FC<InputProps> = ({
    name,
    control,
    label,
    type,
    clearOnEdit,
    min = 3,
    max = 45,
    pattern,
    required = true,
    helperText,
}) => {
    return (
        <>
            <IonItem>
                <Controller
                    // console.log(field);
                    render={({ field }) => (
                        <IonInput
                            onIonChange={field.onChange}
                            value={field.value}
                            type={type}
                            clearOnEdit={clearOnEdit}
                            required={required}
                            minlength={min}
                            maxlength={max}
                            pattern={pattern}
                            helperText={helperText}
                            label={label}
                            labelPlacement="floating"
                        />
                    )}
                    name={name}
                    control={control}
                />
            </IonItem>
        </>
    );
};

export default Input;
