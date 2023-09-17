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
import Welcome from './pages/Welcome';
// import { useIonRouter } from '@ionic/react';

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
// import RegisterTest from './pages/RegisterTest';
import { useState } from 'react';
import HomePractice from './pages/HomePractice';

setupIonicReact();

export const toPage = (page: string, router: UseIonRouterResult, shouldReplace: Boolean = true) => {
    router.push(`/${page}`, 'root', shouldReplace ? 'replace' : 'push');
};

// the useState is most likely temporary
// Or will be used later, with added functionality
// To get info from storage somewhere and add it into the app
const App: React.FC = () => {
    const [user, setUser] = useState<string | null>('null');

    const logout = () => {
        setUser(null);
    };
    if (user) {
        return (
            <>
                <IonApp>
                    <IonReactRouter>
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/home">
                                    <HomePractice />
                                </Route>
                                <Route path="/profile">
                                    <Profile logout={logout} />
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
                                    <Redirect to="/home" />
                                </Route>
                                <Route render={() => <Redirect to={'/home'} />} />
                            </IonRouterOutlet>
                            <IonTabBar slot="bottom" color="warning">
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
                                    <IonIcon aria-hidden="true" icon={personCircle} />
                                    <IonLabel>Profile</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>
                    </IonReactRouter>
                </IonApp>
            </>
        );
    } else {
        return (
            <>
                <IonApp>
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route path="/login">
                                <Login setUser={setUser} />
                            </Route>
                            <Route path="/register">
                                <Register setUser={setUser} />
                            </Route>
                            <Route path="/welcome">
                                <Welcome />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/welcome" />
                            </Route>
                            <Route render={() => <Redirect to={'/welcome'} />} />
                        </IonRouterOutlet>
                    </IonReactRouter>
                </IonApp>
            </>
        );
    }
};

export default App;
