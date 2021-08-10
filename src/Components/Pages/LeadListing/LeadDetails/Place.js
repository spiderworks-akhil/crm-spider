import AuthContext from "../../../Auth/Auth";
import {Modal, Button} from "react-bootstrap";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import {Spinner} from "react-bootstrap"
import notify from "../../../Helpers/Helper";

const Place = (props) => {

    const authCtx = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);
    const [orgnisationId, setOrgnisationId] = useState('');

    const [organisationsList, setOrganisationsList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        assignOrginsation(orgnisationId)
    }

    const fetchOrganisations = async () => {
        let path = "organisations";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {

            if(res.data.status === "success"){
                setOrganisationsList(res.data.data.organisations);
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

    const assignOrginsation = async (id) => {
        let path = "leads/assign-organisation?leads_id="+props.lead_id+"&organisation_id="+id;
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

    useEffect(() =>{
        fetchOrganisations();
    },[])


    return (
        <div className="col-md-3 pl-0">

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Assign this lead to a branch</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <select className="form-control" placeholder="Please choose a branch" onChange={organisationsChangeHandler}>
                        {organisationsList.map(obj => <option value={obj.id}>{obj.name}</option> )}
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
                               title="Branch"></i><b> {props.place? props.place.name : "Assign to a branch"}</b> <a href="#" className="point-drop"
                                                                                data-toggle="dropdown"
                                                                                aria-haspopup="true"
                                                                                aria-expanded="false">  <i
                            className="ri-arrow-down-s-fill"></i>  </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <button className="dropdown-item" type="button" onClick={handleShow}>Assign to a branch</button>
                           </div>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Place;