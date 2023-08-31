import { IonContent, IonPage, IonText, IonInput, IonButton, IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React from "react";
// import "./Home.css";
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";

const RegisterTest: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const formFields: InputProps[] = [
    {
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      clearOnEdit: false,
      min: 7,
      // pattern: "^(?=.[A-Z])(?=.\\d)(?=.*[\\W_]).{7,}$",
      // TODO: Add helper text for the password regex
    },
  ];

  const registerUser = (data: any) => {
    console.log("creating a new user account with: ", data);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="ion-padding">
          <IonText color="muted">
            <h2>Create Account</h2>
          </IonText>
          <form onSubmit={handleSubmit(registerUser)}>
            {formFields.map((field, index) => (
              <Input {...field} control={control} key={index} />
            ))}
            {/* <IonItem>
              <IonLabel>I agree to the terms of service</IonLabel>
              <IonCheckbox slot="start" />
            </IonItem> */}
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Register
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterTest;
