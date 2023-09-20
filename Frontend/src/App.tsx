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
import Register from './pages/Register';
import ProfileEdit from './pages/ProfileEdit';
import SelectTags from './pages/SelectTags';

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

setupIonicReact();

export const replacePage = (page: string, router: UseIonRouterResult) => {
    router.push(`/${page}`, 'root', 'replace');
    console.log(router.routeInfo);
};

export const pushPage = (page: string, router: UseIonRouterResult) => {
    router.push(`/${page}`, 'forward');
};

export const PasswordRegex = '^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$';

// the useState is most likely temporary
// Or will be used later, with added functionality
// To get info from storage somewhere and add it into the app
const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null); // used for profile
    const [id, setID] = useState<number>(0); // used for tags
    // const [user, setUser] = useState<string | null>('test@ing.com'); // for testing purposes, enable to bypass login area
    // const [id, setID] = useState<number>(1); // for testing purposes, enable to test tags when bypassing login area

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
                                <Route path="/:tab(home)">
                                    <Home />
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
                                    <EventAdd />
                                </Route>
                                <Route path="/tags">
                                    <SelectTags id={id} showBack={false} />
                                </Route>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route render={() => <Redirect to={'/home'} />} />
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
                                <Register setUser={setUser} setID={setID} />
                                {/* <RegisterTest /> */}
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/register" />
                            </Route>
                            <Route render={() => <Redirect to={'/register'} />} />
                        </IonRouterOutlet>
                    </IonReactRouter>
                </IonApp>
            </>
        );
    }
};

export default App;
