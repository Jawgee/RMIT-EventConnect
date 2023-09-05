import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    UseIonRouterResult,
    setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, personCircle, search, mail, addCircle } from 'ionicons/icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Inbox from './pages/Inbox';
import EventAdd from './pages/EventAdd';
import Login from './pages/Login';
import { useIonRouter } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register';
import RegisterTest from './pages/RegisterTest';

setupIonicReact();

export const toPage = (page: string, router: UseIonRouterResult, shouldReplace: Boolean = true) => {
    router.push(`/${page}`, 'root', shouldReplace ? 'replace' : 'push');
};

// Note: Things that are commented out are going to be moved
// To be a part of the "main" app later
// But right now they are not necessary
const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                        {/* <RegisterTest /> */}
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/explore">
                        <Explore />
                    </Route>
                    <Route path="/inbox">
                        <Inbox />
                    </Route>
                    <Route path="/eventadd">
                        <EventAdd />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/register" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                        <IonIcon aria-hidden="true" icon={home} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="explore" href="/explore">
                        <IonIcon aria-hidden="true" icon={search} />
                        <IonLabel>Explore</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="eventadd" href="/eventadd">
                        <IonIcon aria-hidden="true" icon={addCircle} />
                        <IonLabel>Add Event</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="inbox" href="/inbox">
                        <IonIcon aria-hidden="true" icon={mail} />
                        <IonLabel>Inbox</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="profile" href="/profile">
                        <IonIcon icon={personCircle} />
                        <IonLabel>Profile</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
