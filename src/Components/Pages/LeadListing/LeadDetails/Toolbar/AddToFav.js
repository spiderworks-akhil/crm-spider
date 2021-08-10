import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import {useState, useContext} from "react"
import AuthContext from "../../../../Auth/Auth";

const AddToFav = (props) => {
    const authCtx = useContext(AuthContext);

    const [fav, setFav] = useState(props.fav);

    const addToFav = async () => {
        let data = { leads_id : props.lead_id}
        let path = "";
        if(props.fav === 0){
            path ='leads/add-to-favourite';
        }else{
            path ='leads/remove-from-favourite';
        }

        await axios.post(path+'?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of leads api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    props.favUpdate(props.lead_id)
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })
    }


    return (
        <div className="pb-2">
            <div className="btn-group mr-1">
            <button  className="btn def-btn btn-icon mr-1" data-toggle="tooltip" data-placement="bottom" title=""
               data-original-title="Add Fvorite" onClick={addToFav}>
                {(fav === 0)? <i className="ri-heart-line"></i> : <i className="ri-heart-fill"></i> }
            </button>
            </div>
        </div>
    );
}

export default AddToFav;