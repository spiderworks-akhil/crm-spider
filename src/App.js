import './App.css';
import LoginPage from './Components/Pages/Login/LoginPage'
import Header from './Components/Common/Header'
import LeftMenu from './Components/Common/LeftMenu'
import LeadListingPage from './Components/Pages/LeadListing/LeadListigPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState,useContext} from "react";
import {Route,Switch,Link,useHistory } from "react-router-dom";
import AuthContext from "./Components/Auth/Auth";

function App() {
    const [status,setStatus] = useState(1);
    const [token,setToken] = useState(localStorage.getItem("auth-token"));
    let history = useHistory ();
    const authCtx = useContext(AuthContext);
    const isLoggedIn =  authCtx.isLoggedIn;

    const SwitchStatusHandler = (status_id) => {
        setStatus(status_id)
    }

    const loginHandler = (token) => {
        setToken(authCtx.token);
    }
    const logoutHandler = () =>{
        authCtx.logout();
        setToken();
    }

    console.log(authCtx.isLoggedIn);

    if(!authCtx.isLoggedIn){
        return <LoginPage onLogin={loginHandler} />;
    }



    return (
            <div>
                <div className="App">
                    <Header onLogOut={logoutHandler} onStatusChange={SwitchStatusHandler} />
                    <section className="body-part">
                        <LeftMenu/>

                        <div className="content-1">
                            <Switch>
                                <Route path="/" exact>
                                    <LeadListingPage lead_type_id={status}/>
                                </Route>
                                <Route path="/leads/:id">
                                    <LeadListingPage lead_type_id={status}/>
                                </Route>
                                <Route path="/login">
                                    <LoginPage onLogin={loginHandler} />
                                </Route>
                                <Route path="/logout">
                                    <LoginPage onLogin={loginHandler} />
                                </Route>
                            </Switch>
                        </div>
                    </section>
                </div>
                <ToastContainer />
            </div>
    );
}

export default App;
