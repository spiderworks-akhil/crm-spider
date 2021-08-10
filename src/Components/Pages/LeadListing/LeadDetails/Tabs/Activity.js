import AuthContext from "../../../../Auth/Auth";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import SingleActivity from "./SingleActivity"

const Activity = (props) => {
    const authCtx = useContext(AuthContext);
    const [activityList, setActivityList] = useState([]);
    useEffect(() => {
        fetchActivities();
    },[])

    const fetchActivities = async () => {
        let path = "leads/activities";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {

            if(res.data.status === "success"){
                setActivityList(res.data.data.activities)
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


    return <div className="tab-pane fade show active" id="pills-Activity" role="tabpanel"
                aria-labelledby="pills-Activity-tab">
        <div className="qa-message-list">
            {activityList.map(obj => <SingleActivity item={obj} key={obj.id} /> )}

        </div>
    </div>
}

export default Activity;