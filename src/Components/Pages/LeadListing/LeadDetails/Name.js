import {Modal, Button} from "react-bootstrap";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import AuthContext from "../../../Auth/Auth";

const Name = (props) => {
    const authCtx = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [path, setPath] = useState('contacts/store');

    const [primary_contact_id,setPrimaryContactId] = useState(props.primary_contact_id);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [designation,setDesignation] = useState('');
    const [remarks,setRemarks] = useState('');

    const handleNameChange = (e) => {setName(e.target.value)};
    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePhoneChange = (e) => {setPhone(e.target.value)};
    const handleAddressChange = (e) => {setAddress(e.target.value)};
    const handleDesignationChange = (e) => {setDesignation(e.target.value)};
    const handleRemarksChange = (e) => {setRemarks(e.target.value)};

    const [button_loading, setButtonLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect( () =>{
         axios.get('contacts/get-contact?contact_id='+primary_contact_id+'&api_token='+authCtx.token)
            .then(res => {

                if(res.data.status === "success"){
                    if(res.data.data !== undefined) {

                        setName(res.data.data.name);
                        setEmail(res.data.data.email1);
                        setPhone(res.data.data.phone_number1);
                        setAddress(res.data.data.address);
                        setDesignation(res.data.data.designation);
                        setRemarks(res.data.data.remarks);
                        if(primary_contact_id !== null){
                            setPath('contacts/update');
                        }

                    }else{setName('')}
                }else{
                    setName(props.name);

                }
            })
    },[]);

    const handleSubmit = () => {
        let data = {
            "id": primary_contact_id,
            "name": name,
            "email1": email,
            "email2": "",
            "phone_number1": phone,
            "phone_number2": "",
            "address": address,
            "designation": designation,
            "remarks": remarks,
            "lead_id": props.lead_id
        };
        updateContact(data,path);
    }

    const updateContact = async (data,path) => {

        setButtonLoading(true);
        await axios.post(path+'?api_token='+authCtx.token,data).then(res => {
            console.log("response from contact api",res.data);
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
                handleClose(true);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }
            }
        })
        setButtonLoading(false);
    }

    const nameView = () => {

        if(primary_contact_id !== null){
            return <div>
                <b>{name}</b>
                <a href="#" className="point-drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i className="ri-arrow-down-s-fill"></i>  </a>
                           <div className="dropdown-menu dropdown-menu-right">
                               <button className="dropdown-item" type="button" onClick={handleShow}>Edit contact</button>
                           </div>
            </div>;
        }else{
            return <div>
                <b>{name}</b>
                <a href="#" className="point-drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i className="ri-arrow-down-s-fill"></i>  </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button" onClick={handleShow}>Save contact</button>
                </div>
            </div>;
        }

    }


    return (
        <div className="col-md-3 pl-0">

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Contact Manager</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <label>Name <span className="badge badge-danger">required</span></label>
                        <input type="text" className="form-control" placeholder="Name" value={name} onChange={handleNameChange} />

                        <label>Email address <span className="badge badge-danger">required</span></label>
                        <input type="text" className="form-control" placeholder="Email"  value={email}   onChange={handleEmailChange}  />

                        <label>Phone number <span className="badge badge-danger">required</span></label>
                        <input type="text" className="form-control" placeholder="Phone" value={phone}  onChange={handlePhoneChange}  />

                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" value={address}   onChange={handleAddressChange} />

                        <label>Designation</label>
                        <textarea type="text" className="form-control" placeholder="Designation of the contact" value={designation}  onChange={handleDesignationChange}  />

                        <label>Remarks</label>
                        <textarea type="text" className="form-control" placeholder="Remarks about the contact" value={remarks}  onChange={handleRemarksChange}  />

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Update Now
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                    <button type="button" className="btn btn-secondary"  onClick={handleClose}>Close</button>
                </div>
            </Modal>

            <div className="lead-details-item">
                <span className=" d-flex align-items-center">
                    <i className="ri-user-2-line" data-toggle="tooltip" data-placement="bottom" title="User name"></i>
                    {nameView()}
                </span>
            </div>
            <hr/>
        </div>
    );
}

export default Name;