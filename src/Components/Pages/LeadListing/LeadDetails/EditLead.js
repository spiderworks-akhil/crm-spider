import {useEffect,useState, useContext} from "react";
import axios from "axios/index";
import notify from "../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import AuthContext from "../../../Auth/Auth";
import "./EditLead.css";

const EditLead = (props) => {
    const authCtx = useContext(AuthContext);

    const [email, setEmail] = useState(props.lead_data.email);
    const [phone_number, setPhoneNumber] = useState(props.lead_data.phone_number);
    const [name, setName] = useState(props.lead_data.name);
    const [company_name, setCompanyName] = useState(props.lead_data.company_name);
    const [title, setTitle] = useState(props.lead_data.title);
    const [requirement, setRequirement] = useState(props.lead_data.requirement);
    const [modifiedRequirement, setModifiedRequirement] = useState(props.lead_data.detailed_requirement);
    const [location, setLocation] = useState(props.lead_data.location);
    const [pincode, setPincode] = useState(props.lead_data.pincode);


    const [leadTypeId, setLeadTypeId] = useState(props.lead_data.lead_types_id);
    const [leadTypeList, setLeadTypeList] = useState([]);

    const [button_loading, setButtonLoading] = useState(false);

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePhoneNumberChange = (e) => {setPhoneNumber(e.target.value)};
    const handleNameChange = (e) => {setName(e.target.value)};
    const handleCompanyChange = (e) => {setCompanyName(e.target.value)};
    const handleTitleChange = (e) => {setTitle(e.target.value)};
    const handleRequirementChange = (e) => {setRequirement(e.target.value)};
    const handleLocationChange = (e) => {setLocation(e.target.value)};
    const handlePincodeChange = (e) => {setPincode(e.target.value)};

    const handleModifiedRequirementChange = (e) => {setModifiedRequirement(e.target.value)};
    const handleLeadTypeIdChange = (e) => {setLeadTypeId(e.target.value)};

    const leadTypes = () => {
            axios.get('lead-types?api_token='+authCtx.token)
            .then(res => {
                console.log(res.data)
                if(res.data.status === "success"){
                    setLeadTypeList(res.data.data.lead_types);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })
    }

    const updateLead = async (data) => {
        setButtonLoading(true);
        await axios.post('leads/update?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of leads api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    props.onLeadUpdate(props.lead_data.id);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })
        setButtonLoading(false);
    }


    const handleSubmit = () => {
        let data = {
            id : props.lead_data.id,
            lead_types_id : leadTypeId,
            name : name,
            title : title,
            company_name : company_name,
            email : email,
            phone_number : phone_number,
            requirement : requirement,
            location : location,
            pincode : pincode,
            detailed_requirement : modifiedRequirement,
        }

       updateLead(data);
    }

    const handleModalClose = () =>  {
        props.onCloseModal();
    }

    useEffect(() => {
        title? setTitle(props.lead_data.title) : setTitle(props.lead_data.name+" "+props.lead_data.company_name);
        leadTypes();
    },[])

    return (
        <div className="modal-content pad-20">

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Lead </h5>

                <select className="form-control lead_type_change d-none" onChange={handleLeadTypeIdChange}>
                    {leadTypeList.map(obj => {
                        if(leadTypeId === obj.id)
                            {
                                return <option value={obj.id} selected > {obj.name}</option>
                            }
                        else
                            {
                                return <option value={obj.id} > {obj.name}</option>
                            }
                    })
                    }
                </select>
                <button type="button" className="close" onClick={handleModalClose}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <div className="modal-body">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Contact Person</label>
                            <input type="text" className="form-control" id="inputEmail4"
                                   placeholder="Contact Person" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Organization</label>
                            <input type="text" className="form-control" id="inputPassword4"
                                   placeholder="Organization"  value={company_name} onChange={handleCompanyChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Title</label>
                            <input type="text" className="form-control" id="inputEmail4"
                                   placeholder="Title" value={title} onChange={handleTitleChange}/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">Phone</label>
                            <input type="text" className="form-control" id="inputPassword4"
                                   placeholder="Phone" value={phone_number} onChange={handlePhoneNumberChange} />
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Location</label>
                            <input type="text" className="form-control"
                                   placeholder="Location" value={location} onChange={handleLocationChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Pincode</label>
                            <input type="text" className="form-control"
                                   placeholder="Pincode" value={pincode} onChange={handlePincodeChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" className="form-control" id="inputEmail4"
                                   placeholder="Email" value={email} onChange={handleEmailChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Requirement</label>
                            <textarea type="text" className="form-control"
                                   placeholder="Requirement" value={requirement} onChange={handleRequirementChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Modified Requirement</label>
                            <textarea type="text" className="form-control"
                                      placeholder="Modified Requirement" value={modifiedRequirement} onChange={handleModifiedRequirementChange} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Update Now
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                </form>
            </div>

        </div>
    );
}

export default EditLead;