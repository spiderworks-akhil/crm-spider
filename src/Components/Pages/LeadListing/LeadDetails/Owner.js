import AuthContext from "../../../Auth/Auth";
import {Modal, Button} from "react-bootstrap";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import {Spinner} from "react-bootstrap"
import notify from "../../../Helpers/Helper";
import Api from "../../../Api/Api";

const Owner = (props) => {

    const authCtx = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);
    const [orgnisationId, setOrgnisationId] = useState('');
    const [userId, setUserId] = useState('');

    const [usersList, setUsersList] = useState([]);
    const [organisationsList, setOrganisationsList ] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        assignUser(userId)
    }

    const fetchOrganizations = () => {
        axios.get('organisations?api_token='+authCtx.token).then(res => {
          if(res.data.status === "success"){
              setOrganisationsList(res.data.data.organisations);
          }
        });
    }

    const fetchUsers = async () => {
        let path = "";
        if(orgnisationId !== ""){
            path = "users/search-by-branch?organisations_id="+orgnisationId;
        }else{
            path = "users?";
        }
        await axios.get(path+'&api_token='+authCtx.token).then(res => {
console.log('users list : ', res.data.data)
            if(res.data.status === "success"){
                if(typeof res.data.data.users !== 'undefined'){
                    setUsersList(res.data.data.users);
                }else if(typeof res.data.data !== 'undefined'){
                    setUsersList(res.data.data);
                }else{
                    setUsersList([]);
                }
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }

            }
        })
    }

    const assignUser = async (id) => {
        let path = "leads/assign-user?leads_id="+props.lead_id+"&user_id="+id;
        await axios.get(path+'&api_token='+authCtx.token).then(res => {
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
                props.onAssign(props.lead_id);
                handleClose();
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }
            }
        })
    }

    const organisationsChangeHandler = (e) =>{
        setOrgnisationId(e.target.value);
    }

    const userChangeHandler = (e) =>{
        setUserId(e.target.value);
    }

    useEffect(() =>{
        fetchUsers();
        fetchOrganizations();
        console.log(props.owner)
    },[orgnisationId])


    return (
        <div className="col-md-3 pl-0">

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Assign this lead to a user</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                    <label htmlFor="">Please select a branch if you want of filter users</label>
                    <select className="form-control" placeholder="Please choose a branch" onChange={organisationsChangeHandler}>
                        <option value="">Please choose</option>
                        {organisationsList.map(obj => <option value={obj.id}>{obj.name}</option> )}
                    </select>

                    <label htmlFor="">Please select a user</label>
                    <select className="form-control" placeholder="Please choose a user" onChange={userChangeHandler}>
                        <option value="">Please choose</option>
                        {usersList.map(obj => <option value={obj.id}>{obj.name}</option> )}
                    </select>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Assign Now
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                    <button type="button" className="btn btn-secondary"  onClick={handleClose}>Close</button>
                </div>
            </Modal>

            <div className="lead-details-item">
                        <span className=" d-flex align-items-center">
                            <i className="ri-building-2-line" data-toggle="tooltip" data-placement="bottom"
                               title="Branch"></i><b> {props.owner? props.owner.name : "Assign to a user"}</b> <a href="#" className="point-drop"
                                                                                                               data-toggle="dropdown"
                                                                                                               aria-haspopup="true"
                                                                                                               aria-expanded="false">  <i
                            className="ri-arrow-down-s-fill"></i>  </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <button className="dropdown-item" type="button" onClick={handleShow}>Assign to a user</button>
                           </div>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Owner;