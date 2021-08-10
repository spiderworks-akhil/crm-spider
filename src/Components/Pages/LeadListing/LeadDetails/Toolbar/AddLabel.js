import {Modal, Button} from "react-bootstrap";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import { SliderPicker  } from 'react-color';
import './AddLabel.css'
import AuthContext from "../../../../Auth/Auth";

const AddLabel = (props) => {
    const authCtx = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);
    const [style, setStyle] = useState({
        backgroundColor: "black",
        color : "white"
    })
    const [labelList,setLabelList] = useState([]);

    const [title, setTitile] = useState('');
    const [backgroundColor, setBackgroundColor] = useState("#000000");
    const [textColor, setTextColor] = useState("#FFFFFF");
    const [labelId, setLabelId] = useState('');
    const [labels, setLabels] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleName = (e) => {setTitile(e.target.value);}

    const handleSubmit = () => {
        let data = {
            leads_id: props.lead_id,
            name:title,
            text_colour:textColor,
            bg_colour:backgroundColor
        };
        let path = 'labels/store';
        updateLabel(data,path);
    }

    const handleSelectSubmit = () => {
        let data = {
            "leads_id": props.lead_id,
            "labels_id": labelId
        }
        let path = 'labels/store';
        updateLabel(data,path);
    }

    useEffect(() => {
        fetchLabels();
        fetchAllLabels();
    },[])

    const fetchAllLabels = async () => {
        let path = "labels";
        await axios.get(path+'?api_token='+authCtx.token+'&lead_types_id='+props.lead_type_id).then(res => {

            if(res.data.status === "success"){
                setLabels(res.data.data.labels)
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

    const fetchLabels = async () => {
        let path = "labels";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {

            if(res.data.status === "success"){
                setLabelList(res.data.data.labels)
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

    const handleBackgroundColorChange = (color) => { setBackgroundColor(color.hex); setStyle({backgroundColor: backgroundColor,color : textColor}); };
    const handleTextColorChange = (color) => { setTextColor(color.hex);  setStyle({backgroundColor: backgroundColor,color : textColor}); };

    const handleSelectChange = (e) => { setLabelId(e.target.value); };

    const updateLabel = async (data,path) => {
        setButtonLoading(true);
        await axios.post(path+'?api_token='+authCtx.token,data).then(res => {

            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
                fetchLabels();
                handleClose(true);
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

    return (
        <div className="pb-2">
            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Create a label for this lead</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <select className="form-control" onChange={handleSelectChange}>
                        <option value="">Choose</option>
                        {labels.map(obj =>  <option value={obj.id}>{obj.name}</option> ) }
                    </select>
                    <button className="btn btn-primary" onClick={handleSelectSubmit}>Add</button>
                    <hr/>
                    <label>Label name <span className="badge badge-danger">required</span></label>
                    <input type="text" className="form-control" placeholder="Name" onChange={handleName} />

                    <span>Select background color</span>
                    <SliderPicker  color={backgroundColor} onChange={handleBackgroundColorChange} onChangeComplete={handleBackgroundColorChange} />
                    <hr/>
                    <span>Select text color</span>
                    <SliderPicker  color={textColor} onChange={handleTextColorChange} onChangeComplete={handleTextColorChange}  />
                    <hr/>
                    Label Preview
                    <span className="label-ui" style={style}>Label</span>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Update Now
                        {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                    </button>
                    <button type="button" className="btn btn-secondary"  onClick={handleClose}>Close</button>
                </div>
            </Modal>

            {labelList.map(obj=> <span className="label-ui" style={{backgroundColor:obj.background_colour,color:obj.text_colour}}> {obj.title}</span> )}
            <div className="btn-group mr-1">

                <button type="button" className="btn def-btn  btn-icon" onClick={handleShow}>
                        <i className="ri-add-line" data-toggle="tooltip" data-placement="bottom"
                           title="Add Label" />
                </button>

            </div>

        </div>
    );
}

export default AddLabel;