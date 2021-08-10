import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import {Spinner,Modal} from "react-bootstrap"
import {useState,useContext} from "react"
import AuthContext from "../../../../Auth/Auth";
import moment from "moment"

const AddCall = (props) => {
    const authCtx = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);

    const [callTimeNormal, setCallTimeNormal] = useState("");
    const [callTime, setCallTime] = useState("");
    const [duration, setDuration] = useState("");
    const [note, setNote] = useState("");

    const handleCallTimeChange = (e) => { setCallTime(e.target.value); setCallTimeNormal(moment(e.target.value).format('Y-M-d H:m:s'));}
    const handleDurationChange = (e) => { setDuration(e.target.value); }
    const handleNoteChange = (e) => { setNote(e.target.value); }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateCall = async (data) => {
        setButtonLoading(true);
        await axios.post('call-logs/store?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of Call api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    props.callUpdate();
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


    const handleSubmit = () => {
        let data = {
            "leads_id": props.lead_id,
            "call_time": callTimeNormal,
            "duration": duration,
            "note": note
        }
        updateCall(data)
        setCallTime("");
        setDuration("");
        setNote("");
}


    return (
        <div className="pb-2">
            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Add your call log for this lead</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <label>Call time<span className="badge badge-danger">required</span></label>
                    <input type="datetime-local" className="form-control" placeholder="Call time" onChange={handleCallTimeChange} value={callTime} />

                    <label>Duration (In Minutes )<span className="badge badge-danger">required</span></label>
                    <input type="text" className="form-control" placeholder="Duration" onChange={handleDurationChange} value={duration} />

                    <label>Notes<span className="badge badge-danger">required</span></label>
                    <textarea type="text" className="form-control" placeholder="Notes" onChange={handleNoteChange} value={note} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Update Now
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                    <button type="button" className="btn btn-secondary"  onClick={handleClose}>Close</button>
                </div>
            </Modal>


            <div className="btn-group mr-1">

                <button type="button" className="btn def-btn  btn-icon" onClick={handleShow}>
                    <i className="ri-phone-line" data-toggle="tooltip" data-placement="bottom"
                       title="Add Label" />
                </button>

            </div>

        </div>
    );
}

export default AddCall;