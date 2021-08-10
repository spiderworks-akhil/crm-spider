import notify from "../Helpers/Helper";
import axios from "axios/index";
import {useEffect, useState, useContext} from "react";
import AuthContext from "../Auth/Auth";
import AddLead from "../Pages/home/AddLead";
import {Modal} from "react-bootstrap";

const Header = (props) => {
    const [leadTypes,setleadTypes] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        axios.get('lead-types?api_token='+authCtx.token)
            .then(res => {
                console.log(res.data)
                if(res.data.status === "success"){
                    setleadTypes(res.data.data.lead_types);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })
    },[])

    const onStatusChangeHandler = (event) => {
        props.onStatusChange(event.target.value);
    }

    const logoutHandler = () => {
        props.onLogOut();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};

    const onLeadUpdateHandler = (id) =>{
        console.log(id)
    }




    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <AddLead onCloseModal={handleClose} onLeadUpdate={onLeadUpdateHandler} />
            </Modal>
        <nav className="navbar navbar-expand-lg navbar-light   admin-nav">
            <div className="container">

                <a className="navbar-brand" href="/#">
                    <img src="assets/images/logo.png" height="40" alt="logo" />
                </a>

                <a className="mob-slide-menu">
                    <i className="ri-menu-line"></i>
                    <i className="ri-close-line"></i>
                </a>


                <form className="form-inline my-2 my-lg-0 mr-3 first-form">
                    <select className="form-control full-width" onChange={onStatusChangeHandler}>
                        {leadTypes.map(obj => <option key={obj.id} value={obj.id}>{obj.name}</option>)}
                    </select>
                </form>

                <button className="btn btn-primary" onClick={handleShow}>
                    <i className="ri-add-line d-inline-block"></i> Add Lead
                </button>





                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">

                        <li>
                            <a className="nav-link text-white" onClick={logoutHandler}>Logout</a>
                        </li>



                        <li className="nav-item dropdown" >
                            <a className="nav-link   menu-icon" href="/#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i className="ri-user-3-line"></i></a>
                            <div className="dropdown-menu profle-hd" aria-labelledby="navbarDropdown2">


                                <div className="account-menu">
                                    <div className="account-menu__divider"></div>
                                    <a href="/account-dashboard.html" className="account-menu__user">
                                        <div className="account-menu__user-avatar">
                                            <img src={process.env.PUBLIC_URL + '/assets/images/photo-of-woman-playing-piano-2592179.png'} alt="logo" />
                                        </div>
                                        <div className="account-menu__user-info">
                                            <div className="account-menu__user-name">Helena Garcia</div>
                                            <div className="account-menu__user-email">stroyka@example.com</div>
                                        </div>
                                    </a>
                                    <div className="account-menu__divider"></div>
                                    <ul className="account-menu__links">
                                        <li><a href="/account-profile.html">Edit Profile</a></li>
                                        <li><a href="/account-orders.html">Order History</a></li>
                                        <li><a href="/account-addresses.html">Addresses</a></li>
                                        <li><a href="/account-password.html">Password</a></li>
                                    </ul>
                                    <div className="account-menu__divider"></div>
                                    <ul className="account-menu__links">
                                        <li><a href="/account-login.html">Logout</a></li>
                                    </ul>
                                </div>

                            </div>
                        </li>
                    </ul>

                </div>
            </div>

    </nav>
            </>);
}

export default Header;