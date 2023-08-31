import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
// import './Login.css';
import { useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import { verifyUser } from "../data/accounts.js";
import { useState } from "react";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const formFields: InputProps[] = [
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

  const loginUserOnSubmit = (data: any) => {
    verifyUser(data.email, data.password).then((e) => {
      let [successful, message] = e;

      if (successful) {
        // TODO: Add redirect to home page here
        router.push("/home", "root", "replace");
      } else {
        setErrorMessage(message);
      }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit(loginUserOnSubmit)}>
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
            Login
          </IonButton>
          {/* </IonList> */}
          {/* TODO: make this look better */}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
