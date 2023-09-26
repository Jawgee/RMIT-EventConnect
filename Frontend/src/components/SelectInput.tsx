import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import './Input.css';

const SelectInput: React.FC<{ control: Control<any>; options: any[]; placeholder: string; label: string }> = ({
    control,
    options,
    placeholder,
    label,
}) => {
    return (
        <Controller
            name={label}
            control={control}
            render={({ field }) => (
                <IonChip outline={true}>
                    <IonSelect
                        {...field}
                        onIonChange={field.onChange}
                        placeholder={placeholder}
                        label={label}
                        labelPlacement="floating"
                        style={{ textTransform: 'capitalize' }}
                    >
                        {options.map((e, i) => (
                            <IonSelectOption key={i} value={e}>
                                {e}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonChip>
            )}
        />
    );
};

export default SelectInput;
