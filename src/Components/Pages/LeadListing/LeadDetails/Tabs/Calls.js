import AuthContext from "../../../../Auth/Auth";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../../Helpers/Helper";

const Calls = (props) => {
    const authCtx = useContext(AuthContext);

    const [callsList, setCallsList] = useState([]);
    useEffect(() => {
        fetchCalls();
    },[])

    const fetchCalls = async () => {
        let path = "api/call-logs";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {
            console.log(res.data.data)
            if(res.data.status === "success"){
                setCallsList(res.data.data.call_logs)
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


    return (<ul className="list-group">
        {callsList.map(obj => <li className="list-group-item" >{obj.note} {obj.call_time} - {Math.round(obj.duration) +'seconds'}</li> )}
    </ul>);

}

export default Calls;