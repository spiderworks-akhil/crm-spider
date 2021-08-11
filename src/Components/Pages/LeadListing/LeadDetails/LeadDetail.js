import RequirementHistory from './RequirementHistory'
import Name from './Name';
import Company from "./Company";
import Email from "./Email";
import Phone from "./Phone";
import Owner from "./Owner";
import Place from "./Place";
import DateTime from "./Date";
import EditLead from "./EditLead";
import {useState, useContext, useEffect} from "react";
import {Modal} from "react-bootstrap";
import ToolBar from "./Toolbar/ToolBar";
import Activity from "./Tabs/Activity"
import Notes from "./Tabs/Notes"
import Calls from "./Tabs/Calls"
import Stages from "./Stages/Stages";
import ThirdParty from "./../LeadDetails/Tabs/ThirdParty"
import AuthContext from "../../../Auth/Auth";
import axios from "axios/index";
import notify from "../../../Helpers/Helper";
import Menu from "./Tabs/CustomTabs/Menu"
import TabContent from "./Tabs/CustomTabs/TabContent"


const LeadDetail = (props) => {

    const authCtx = useContext(AuthContext);

    const [title,setTitle] = useState(props.lead_data.title)
    const [id,setId] = useState(props.lead_data.id)
    const [lead_type_id,setLeadTypeId] = useState(props.lead_data.lead_types_id)
    const [key,setKey] = useState(props.lead_data.id)

    const [name,setName] = useState(props.lead_data.name)
    const [primary_contact_id,setPrimaryContactId] = useState(props.lead_data.primary_contact_id)
    const [phone_number,setPhoneNumber] = useState(props.lead_data.phone_number)
    const [email,setEmail] = useState(props.lead_data.email)
    const [requirement,setRequirement] = useState(props.lead_data.requirement)
    const [modifiedRequirement, setModifiedRequirement] = useState(props.lead_data.detailed_requirement)
    const [company_name,setCompanyName] = useState(props.lead_data.company_name)
    const [created_by,setCreatedBy] = useState(props.lead_data.created_by)
    const [created_at,setCreatedAt] = useState(props.lead_data.created_at)
    const [updated_at,setUpdatedAt] = useState(props.lead_data.updated_at)

    const [customTabs , setCustonTabs] = useState([]);

    const [assignedUser,setAssignedUser] = useState(props.lead_data.assigned_user)
    const [assignedOrganisation,setAssignedOrganisation] = useState(props.lead_data.assigned_organisation)

    const [showActivityTab,setShowActivityTab] = useState(true);
    const [showNotesTab,setShowNotesTab] = useState(false);
    const [showCallTab,setShowCallTab] = useState(false);
    const [showThirdPartyTab,setShowThirdPartyTab] = useState(false);
    const [showCustomTab,setShowCustomTab] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        fetchCustomTabs();
    },[])

    const fetchCustomTabs = async () => {
        await axios.get('data-tabs?api_token='+authCtx.token+'&lead_type_id='+lead_type_id).then(res =>{

            if(res.data.status === "success"){
                setCustonTabs(res.data.data.datatabs);
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

    const handleShowActivity = () => {
        setShowNotesTab(false);
        setShowCallTab(false);
        setShowActivityTab(true);
        setShowThirdPartyTab(false);
        setShowCustomTab(0);

    }

    const handleShowNotes = () => {
        setShowActivityTab(false);
        setShowCallTab(false);
        setShowNotesTab(true);
        setShowThirdPartyTab(false);
        setShowCustomTab(0);

    }

    const handleShowCalls = () => {
        setShowNotesTab(false);
        setShowActivityTab(false);
        setShowCallTab(true);
        setShowThirdPartyTab(false);
        setShowCustomTab(0);

    }

    const handleTabMenuClick = (id) => {
        setShowNotesTab(false);
        setShowActivityTab(false);
        setShowCallTab(false);
        setShowThirdPartyTab(false);
        setShowCustomTab(id);
    }

    const handleShowThirdPartyTab = () => {
        setShowNotesTab(false);
        setShowActivityTab(false);
        setShowCallTab(false);
        setShowThirdPartyTab(true);
        setShowCustomTab(0);

    }

    const onLeadUpdateHandler = (id) =>{
        props.onLeadupdate(id)
    }

    const onNoteUpdateHandler = (id) =>{
        setKey(Math.random())
        handleShowNotes();
    }

    const onCallUpdateHandler = (id) =>{
        setKey(Math.random())
        handleShowCalls();
    }

    const onThirdPartyUpdateHandler = (id) =>{
        setKey(Math.random())
        props.onLeadupdate(id)
        handleShowThirdPartyTab();
    }

    const onFavUpdateHandler = (id) =>{
        props.onLeadupdate(id)
    }

    if(!props.lead_data){
        return <p>Please select a lead</p>;
    }



    const short_name = props.lead_data.name.substring(0,2).toUpperCase();
    return (
        <div>
            <ToolBar favUpdate={onFavUpdateHandler} callUpdate={onCallUpdateHandler}  noteUpdate={onNoteUpdateHandler} lead_data={props.lead_data} />
            <div className="box-shadow pad-10 lead-right-item">
            <Modal show={show} onHide={handleClose}>
                <EditLead onCloseModal={handleClose} onLeadUpdate={onLeadUpdateHandler} lead_data={props.lead_data} lead_id={props.lead_data.id} />
            </Modal>
            <div className="row  lead-left-item mb-2">
                <div className="col-md-12">
                    <div className=" lead-left-item   ">
                        <div className="btn-group float-right">
                            <button type="button" className="btn def-btn  btn-icon" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                <i className="ri-more-2-fill"/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button" onClick={handleShow}>Edit Lead</button>
                            </div>
                        </div>
                        <div className="name-cntr">{short_name}</div>
                        <div className=" user-spec ">
                           <span className=" f-14 font-medium text-truncate black">  {title? title : 'Create a lead title.....'}
                           <a className="d-inline-block" href="#" onClick={handleShow}>
                           <i className="ri-pencil-line  "/></a>
                           </span><br/>
                            <span className="  user-info-deta">
                              <a href="#" className="point-drop float-right" data-toggle="dropdown" aria-haspopup="true"
                                 aria-expanded="false">  <i className="ri-arrow-down-s-fill"/>  </a>
                                {modifiedRequirement? modifiedRequirement : requirement}
                                <RequirementHistory orginalRequirment={requirement} modifiedRequirment={modifiedRequirement}/>
                           </span>
                        </div>
                        <div className="clearfix"/>
                    </div>
                </div>
            </div>




            <div className="row m-0 lead-details">
                <Name primary_contact_id={primary_contact_id} name={props.lead_data.name} lead_id={props.lead_data.id}/>
                <Company company={company_name} />
                <Email showModal={handleShow} email={email}/>
                <Phone showModal={handleShow} phone={phone_number}/>
            </div>
            <hr className="mt-2 mb-2"/>
            <div className="row m-0 lead-details">
                <Owner onAssign={onLeadUpdateHandler} lead_id={id}  owner={assignedUser} />
                <Place onAssign={onLeadUpdateHandler} lead_id={id}  place={assignedOrganisation} />
                <DateTime date={created_at}/>
                <DateTime date={updated_at}/>
            </div>

                <Stages lead_id={id} lead_type_id={props.lead_data.lead_types_id} pipeline_id={props.lead_data.lead_type_pipelines_id} />
                <hr/>




                <ul className="nav nav-pills mb-3 tabs-cntr" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className={showActivityTab ? "nav-link active" : "nav-link" } id="pills-Activity-tab" data-toggle="pill"
                           role="tab" aria-controls="pills-Activity" aria-selected="true" onClick={handleShowActivity}>Activity</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className={showNotesTab ? "nav-link active" : "nav-link" } data-toggle="pill"  role="tab"
                           aria-controls="pills-Notes" aria-selected="false"  onClick={handleShowNotes}>Notes</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className={showCallTab ? "nav-link active" : "nav-link" } data-toggle="pill"  role="tab"
                           aria-controls="pills-Calls" aria-selected="false"  onClick={handleShowCalls}>Calls</a>
                    </li>
                    <li className="nav-item d-none" role="presentation">
                        <a className={showThirdPartyTab ? "nav-link active" : "nav-link" } data-toggle="pill"  role="tab"
                           aria-controls="pills-Calls" aria-selected="false"  onClick={handleShowThirdPartyTab}>ThirdParty</a>
                    </li>

                    {
                        customTabs.map(obj => {
                           return <Menu onPress={handleTabMenuClick} show={showCustomTab} id={obj.id} name={obj.name}/>
                        })
                    }


                </ul>

                <div className="tab-content" id="pills-tabContent">
                    {showActivityTab ? <Activity key={key} lead_id={id}  /> : '' }
                    {showNotesTab ? <Notes key={key} lead_id={id} /> : '' }
                    {showCallTab ? <Calls key={key} lead_id={id} /> : '' }
                    {showThirdPartyTab ? <ThirdParty onAssign={onThirdPartyUpdateHandler} lead_id={id} lead_data={props.lead_data}  /> : '' }

                    {
                        customTabs.map(obj => {
                            return <TabContent show={showCustomTab} lead_id={id}  id={obj.id} name={obj.name}/>
                        })
                    }

                </div>

            </div>
        </div>
    );
}

export default LeadDetail;