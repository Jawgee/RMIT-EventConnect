import React from 'react';
import { IonInput, IonChip, IonIcon } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import '../styles/Input.css';

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
    icon?: string;
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
    icon,
}) => {
    return (
        <>
            <Controller
                // console.log(field);
                render={({ field }) => (
                    <>
                        <IonChip outline={true}>
                            {icon && <IonIcon className="icon-login" icon={icon}></IonIcon>}
                            <IonInput
                                onIonChange={field.onChange}
                                value={field.value}
                                type={type}
                                clearOnEdit={clearOnEdit}
                                required={required}
                                minlength={min}
                                maxlength={max}
                                pattern={pattern}
                                label={label}
                                labelPlacement="floating"
                            />
                        </IonChip>
                        {helperText && (
                            <p style={{ marginTop: '4px', fontSize: '12px', textAlign: 'center' }}>{helperText}</p>
                        )}
                    </>
                )}
                name={name}
                control={control}
            />
        </>
    );
};

export default Input;
