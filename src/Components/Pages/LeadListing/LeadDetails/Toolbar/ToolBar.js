import AddNote from './AddNote'
import './ToolBar.css'
import AddLabel from "./AddLabel";
import AddCall from "./AddCall";
import AddToFav from "./AddToFav";


const ToolBar = (props) => {

    const onNoteUpdateHandler = (id) => {
        props.noteUpdate(id);
    }

    const onCallUpdateHandler = (id) => {
        props.callUpdate(id);
    }

    const onFavUpdateHandler = (id) => {
        props.favUpdate(id);
    }

    return (
        <div className="row">

            <div className="col-md-5">
                <AddLabel lead_id={props.lead_data.id} lead_type_id={props.lead_data.lead_types_id}/>
            </div>

            <div className="col-md-7  ">
                <div className="d-flex justify-content-end pb-2">
                   <AddNote noteUpdate={onNoteUpdateHandler}  lead_id={props.lead_data.id} />
                   <AddCall callUpdate={onCallUpdateHandler}  lead_id={props.lead_data.id} />
                   <AddToFav favUpdate={onFavUpdateHandler}  lead_id={props.lead_data.id} fav={props.lead_data.is_favourite} />
                </div>
            </div>

        </div>
    );
}

export default ToolBar;