import './LoginPage.css';
import {useState, useContext} from "react";
import axios from "axios/index";
import notify from "../../Helpers/Helper";
import { ToastContainer } from 'react-toastify';
import AuthContext from "../../Auth/Auth";


const LoginPage = (props) => {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const authCtx = useContext(AuthContext);

    const handleUsername = (e) => {setUsername(e.target.value)}
    const handlePassword = (e) => {setPassword(e.target.value)}

    const handleSubmit = () =>{
        let data = {
            "email": username,
            "password": password
        }
        loginCheck(data);
    }

    const loginCheck = async (data) => {
        await axios.post('login',data)
            .then(res => {
                console.log("Response of login api : ",res.data);
                if(res.data.status === "success"){
                    authCtx.login(res.data.data.auth_token);
                    notify(res.data.status,res.data.code,res.data.message);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })
    }

    return (
        <div className="row page-block">
            <div className="col-md-4 offset-md-4">

                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <label>Please enter your registered email address</label>
                            <input type="text" className="form-control" placeholder="email address" onChange={handleUsername}/>
                            <label>Please enter your password</label>
                            <input type="password" className="form-control" placeholder="password"  onChange={handlePassword} />
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
                        </div>
                </div>


            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;