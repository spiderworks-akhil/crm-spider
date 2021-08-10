import {useState,useEffect,useContext} from  "react";
import AuthContext from "../../../../Auth/Auth";
import notify from "../../../../Helpers/Helper";
import axios from "axios/index";
import {Spinner,Modal,Form} from "react-bootstrap";
import "./Close.css"

const Close = (props) =>{

    const authCtx = useContext(AuthContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);
    const [key, setKey] = useState(props.lead_id);
    const [actions, setActions] = useState([]);
    const [closingStatus, setLeadClosingStatus] = useState([]);

    //form
    const [closeType, setCloseType] = useState('');
    const [remarks, setRemarks] = useState('');

    const [toStatusId, setToStatusId] = useState('');
    const [toStatusName, setToStatusName] = useState('');

    const handleCloseType = (e) => { setCloseType(e.target.value); };
    const handleRemarksChange = (e) => {setRemarks(e.target.value)};

    const fetchLeadClosingStatus = async() => {
        let path = "leads/get-closing-statuses";
        await axios.get(path+'?api_token='+authCtx.token+'&lead_type_id='+props.lead_type_id+'&pipeline_id='+props.pipeline_id).then(res => {

            if(res.data.status === "success"){
                console.log(res.data.data)
                setLeadClosingStatus(res.data.data);
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

    const handleSubmit = () => {
        let data = {
            "leads_id": props.lead_id,
            "closing_type": closeType,
            "remarks": remarks
        }
        updateStage(data)
    }

    const updateStage = async (data) => {
        setButtonLoading(true);
        await axios.get('leads/close-lead?api_token='+authCtx.token+"&leads_id="+data.leads_id+"&closing_type="+data.closing_type+"&remarks="+data.remarks)
            .then(res => {
                console.log("Response of Call api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    setKey(Math.random());
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
        setButtonLoading(false);
    }

    const fetchClosingActions = async () => {
        let path = "leads/get-closing-actions";
        await axios.get(path+'?api_token='+authCtx.token+'&lead_type_id='+props.lead_type_id).then(res => {
            if(res.data.status === "success"){
                setActions(res.data.data)
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

    const [stagesList, setStagesList] = useState([]);
    useEffect(() => {
        fetchClosingActions();
        fetchLeadClosingStatus();
    },[key])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Close a lead</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">You are going to close this lead please input all the details
                    <div className="form-row">
                        <div key={`inline-radio`} className="mb-3">
                            {closingStatus.map((obj,index) => <Form.Check
                                inline
                                label={obj.name}
                                value={obj.id}
                                name="group1"
                                type="radio"
                                onChange={handleCloseType}
                                id={`inline-radio-`+index}
                            />)}

                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <ul>
                            <li><b>This change will trigger following actions</b></li>
                            {actions.map(obj => <li>{obj.name}</li>)}
                        </ul>
                    </div>

                    <div className="form-group d-block w-100">
                        <label htmlFor="">Remarks</label>
                        <textarea className="form-control" onClick={handleRemarksChange}></textarea>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Yes
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                    <button type="button" className="btn btn-secondary"  onClick={handleClose}>No</button>
                </div>
            </Modal>

            <button type="button" className="btn  btn-prm" onClick={handleShow}>
                Close
            </button>

            <div className="dropdown-menu dropdown-menu-right pad-20 " >
                <form>
                    <div className="form-row">
                        <div className="form-check form-check-inline won">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                   id="inlineRadio1" value="option1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Won</label>
                        </div>
                        <div className="form-check form-check-inline loss">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                   id="inlineRadio2" value="option2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Lost</label>
                        </div>
                        <div className="form-check form-check-inline future">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                   id="inlineRadio3" value="option3" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Future</label>
                        </div>
                        <div className="form-check form-check-inline invalid">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                   id="inlineRadio4" value="option4" />
                            <label className="form-check-label" htmlFor="inlineRadio4">Invalid</label>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        Actions
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Remarks" rows="2"></textarea>
                    </div>
                    <button type="submit" className="btn btn-prm"> Proceed</button>
                    <button type="submit" className="btn btn-prm"> Cancel</button>
                </form>


            </div>
        </div>
    );
}

export default Close;