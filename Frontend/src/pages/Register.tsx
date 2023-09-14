import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter } from '@ionic/react'
// import './Register.css';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input, { type InputProps } from '../components/Input'
import { registerUser } from '../data/accounts.js'
import { toPage } from '../App'

const Register: React.FC<{ setUser: React.Dispatch<React.SetStateAction<string | null>> }> = ({ setUser }) => {
  // Controller for the forms
  const { control, handleSubmit } = useForm()

  // Routing to allow to manually redirect the user
  const router = useIonRouter()

  // Used for error message handling
  // When there was a fail from the backend
  const [errorMessage, setErrorMessage] = useState('')

  // Holds all of the fields and their information
  const formFields: InputProps[] = [
    {
      name: 'first_name',
      label: 'First Name'
    },
    {
      name: 'last_name',
      label: 'Last Name'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      clearOnEdit: false,
      min: 7,
      // TODO: get this regex from elsewhere so it isnt duplicated elsewhere
      pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$',
      helperText: 'Password should have at least 1 uppercase letter, 1 digit and 1 special character.'
    }
  ]

  // Handles submit
  const registerUserOnSubmit = (data: any) => {
    registerUser(data.email, data.password, data.first_name, data.last_name).then((e) => {
      // Get the information from the backend
      const [successful, message] = e

      // If there were no issues
      if (successful) {
        // TODO: Add the proper information here
        // TODO: use data.email probably
        // Set the user to be used elsewhere
        setUser('test')
        // Send the user to the home page
        toPage('home', router)
      } else {
        // Set an error to show on the page
        setErrorMessage(message)
      }
    })
  }

  // TODO: Create proper design
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
                    {/* TODO: make this look better */}
                    {errorMessage && <p>{errorMessage}</p>}
                    <br />
                </form>
                {/* Link to login page */}
                <button onClick={() => { toPage('login', router) }}>Have an account? Login here</button>
            </IonContent>
        </IonPage>
  )
}

export default Register
