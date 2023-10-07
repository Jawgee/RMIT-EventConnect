import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    type UseIonRouterResult,
    setupIonicReact,
} from '@ionic/react';
import { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { home, personCircle, search, mail, addCircle } from 'ionicons/icons';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Inbox from './pages/Inbox';
import EventAdd from './pages/EventAdd';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import ProfileEdit from './pages/ProfileEdit';
import SelectTags from './pages/SelectTags';
// import HomePractice from './pages/HomePractice';

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
import EventView from './pages/EventView';

setupIonicReact();

export const replacePage = (page: string, router: UseIonRouterResult) => {
    router.push(`/${page}`, 'root', 'replace');
};

export const pushPage = (page: string, router: UseIonRouterResult) => {
    router.push(`/${page}`, 'forward');
};

export const PasswordRegex = '^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$';

// the useState is most likely temporary
// Or will be used later, with added functionality
// To get info from storage somewhere and add it into the app
const App: React.FC = () => {
    // const [user, setUser] = useState<string | null>(null); // used for profile
    // const [id, setID] = useState<number>(0); // used for tags
    const [user, setUser] = useState<string | null>('test@ing.com'); // for testing purposes, enable to bypass login area
    const [id, setID] = useState<number>(1); // for testing purposes, enable to test tags when bypassing login area

    const logout = () => {
        setUser(null);
    };

    // const testFunction = (router: UseIonRouterResult) => {
    //     setUser('test@ing.com');
    //     setID(2);
    //     replacePage('tags', router);
    // };

    if (user) {
        return (
            <>
                <IonApp>
                    <IonReactRouter>
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route exact path="/:tab(home)">
                                    <Home />
                                </Route>
                                <Route path="/:tab(home)/event">
                                    <EventView />
                                </Route>
                                <Route path="/:tab(profile)/edit">
                                    <ProfileEdit />
                                </Route>
                                <Route path="/:tab(profile)/tags">
                                    <SelectTags id={id} showBack={true} />
                                </Route>
                                <Route exact path="/:tab(profile)">
                                    <Profile logout={logout} user={user} setID={setID} />
                                </Route>
                                <Route path="/:tab(explore)">
                                    <Explore />
                                </Route>
                                <Route path="/:tab(inbox)">
                                    <Inbox />
                                </Route>
                                <Route path="/:tab(eventadd)">
                                    <EventAdd user={user} />
                                </Route>
                                <Route path="/tags">
                                    <SelectTags id={id} showBack={false} />
                                </Route>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route render={() => <Redirect to={'/home'} />} />
                            </IonRouterOutlet>
                            <IonTabBar slot="bottom" color="medium">
                                <IonTabButton tab="home" href="/home">
                                    <IonIcon color="danger" aria-hidden="true" icon={home} />
                                    <IonLabel>Home</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="explore" href="/explore">
                                    <IonIcon color="success" aria-hidden="true" icon={search} />
                                    <IonLabel>Explore</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="eventadd" href="/eventadd">
                                    <IonIcon color="secondary" aria-hidden="true" icon={addCircle} />
                                    <IonLabel>Add Event</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="inbox" href="/inbox">
                                    <IonIcon color="warning" aria-hidden="true" icon={mail} />
                                    <IonLabel>Inbox</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="profile" href="/profile">
                                    <IonIcon color="primary" aria-hidden="true" icon={personCircle} />
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
                                <Register
                                    setUser={setUser}
                                    setID={setID}
                                    // testFunction={testFunction}
                                />
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
