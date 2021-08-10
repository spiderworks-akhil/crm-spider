import {useEffect,useState, useContext} from "react";
import axios from "axios/index";
import notify from "../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import AuthContext from "../../Auth/Auth";
import { useHistory } from "react-router-dom";

const EditLead = (props) => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [requirement, setRequirement] = useState('');
    const [modifiedRequirement, setModifiedRequirement] = useState('');
    const [location, setLocation] = useState('');
    const [pincode, setPincode] = useState('');



    const [leadTypeId, setLeadTypeId] = useState(1);
    const [leadTypeList, setLeadTypeList] = useState([]);

    const [button_loading, setButtonLoading] = useState(false);

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePhoneNumberChange = (e) => {setPhoneNumber(e.target.value)};
    const handleNameChange = (e) => {
        setName(e.target.value)
        setTitle(name+' '+company_name);
    };
    const handleCompanyChange = (e) => {setCompanyName(e.target.value)
        setTitle(name+' '+company_name);};
    const handleTitleChange = (e) => {setTitle(e.target.value)};
    const handleRequirementChange = (e) => {setRequirement(e.target.value)};
    const handleLocationChange = (e) => {setLocation(e.target.value)};
    const handlePincodeChange = (e) => {setPincode(e.target.value)};

    const handleModifiedRequirementChange = (e) => {setModifiedRequirement(e.target.value)};
    const handleLeadTypeIdChange = (e) => {setLeadTypeId(e.target.value); alert(e.target.value);};

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
        await axios.post('leads/store?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of leads api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
console.log('Id of the lead : '+res.data.data.id);
                    history.push('/leads/'+res.data.data.id);
                    history.go();
                }else{
                    if(res.data.errors){
                        let errors = (res.data.errors.errors);
                        console.log("Erross :", errors)
                        for(const [key, value] of  Object.entries(errors)){
                            notify('error',res.data.code,value);
                        }
                    }else{
                        notify(res.data.status,res.data.code,res.data.message);
                    }
                }
            })
        setButtonLoading(false);
    }


    const handleSubmit = () => {
        let data = {
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
        leadTypes();
    },[])

    return (
        <div className="modal-content pad-20">

            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Lead </h5>

                <select className="form-control lead_type_change d-none" onChange={handleLeadTypeIdChange}>
                    <option value="">choose</option>
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