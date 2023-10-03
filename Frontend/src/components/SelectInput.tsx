import { IonChip, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import './Input.css';

const SelectInput: React.FC<{
    control: Control<any>;
    options: any[];
    placeholder: string;
    label: string;
    name?: string;
    icon?: string;
}> = ({ control, options, placeholder, label, icon, name }) => {
    return (
        <Controller
            control={control}
            name={name ?? label.toLowerCase()}
            render={({ field }) => (
                <IonChip outline={true}>
                    {icon && <IonIcon icon={icon}></IonIcon>}
                    <IonSelect
                        value={field.value}
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
