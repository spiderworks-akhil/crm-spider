import AuthContext from "../../../../Auth/Auth";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import moment from "moment"
import "./Notes.css"
const Notes = (props) => {
    const authCtx = useContext(AuthContext);

    const [notesList, setNotesList] = useState([]);
    useEffect(() => {
        fetchNotes();
    },[])

    const fetchNotes = async () => {
        let path = "notes";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {

            if(res.data.status === "success"){
                setNotesList(res.data.data.notes)
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

    if(notesList.length == 0){
        return <ul className="list-group"> <li>No notes added for this lead </li></ul>
    }


    return (<ul className="list-group">
            {notesList.map(obj => <li className="list-group-item" key={obj.id}>{obj.description} - <small>created by {obj.created_user.name}, {moment(obj.created_at).fromNow()}</small></li>)}
        </ul>);

}

export default Notes;