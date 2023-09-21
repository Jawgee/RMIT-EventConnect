import React from 'react';
import { IonItem, IonInput, IonChip, IonIcon } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import { mail } from 'ionicons/icons';

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
const Input: React.FC<InputProps> = ({
    name,
    control,
    label,
    type,
    clearOnEdit,
    min = 3,
    max = 20,
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
                        <IonChip outline={true}>
                            {/* style={{padding: "10px"}} */}
                            <IonIcon icon={mail}></IonIcon>
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
                        </IonChip>
                    )}
                    name={name}
                    control={control}
                />
            </IonItem>
        </>
    );
};

export default Input;
