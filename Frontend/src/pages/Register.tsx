import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton } from "@ionic/react";
// import './Register.css';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import { registerUser } from "../data/accounts.js";

const Register = () => {
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
      pattern: "^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$",
      helperText: "Password should have at least 1 uppercase letter, 1 digit and 1 special character.",
    },
  ];

  const registerUserOnSubmit = (data: any) => {
    registerUser(data.email, data.password, data.first_name, data.last_name);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit(registerUserOnSubmit)}>
          {/* TODO: Decide if should make it into a list or not (aesthetic choice) */}
          {/* <IonList> */}
          {formFields.map(
            (field, index) => (
              /* <IonItem> */
              <Input {...field} control={control} key={index} />
            )
            /* </IonItem> */
          )}
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Register
          </IonButton>
          {/* </IonList> */}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
