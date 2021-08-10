import LeadFilter from './LeadFilter';
import LeadLists from './LeadLists';
import LeadDetail from './LeadDetails/LeadDetail';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";


import { useState ,useEffect, useContext} from 'react';
import notify from '../../Helpers/Helper'
import AuthContext from "../../Auth/Auth";



const LeadListingPage = (props) => {

    const { id } = useParams();

    const [lead_lists, setLeadLists] = useState([]);
    const [leadData, setLeadData] = useState("");
    const [status,setStatus] = useState("unassigned-leads");
    const [list_loading, setListLoading] = useState(true);
    const [detail_loading, setDetailLoading] = useState(false);

    const [showSearchResults, setShowSearchResults] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const [key, setKey] = useState(Math.random());

    const authCtx = useContext(AuthContext);

    let data = [];

    const SwitchStatusHandler = (status_id) => {
        setStatus(status_id)
    }


    const SwitchLeadHandler = async (id) => {
            fetchLeads(props.lead_type_id,status);
            setDetailLoading(true);
            await axios.get('leads/get-lead?api_token='+authCtx.token+'&lead_id='+id)
                .then(res => {
                    console.log("Response of leads api : ",res.data.status);
                    if(res.data.status === "success"){
                        setLeadData(res.data.data);
                    }else{
                        notify(res.data.status,res.data.code,res.data.message);
                    }
            }).catch(function (error) {
                    notify("error",500,"API error");
            });
            setDetailLoading(false);
    }



    const fetchLeads = async (status,lead_status) => {
        let path = 'leads';
        if(lead_status.length > 0){
            path += '/'+lead_status;
        }
        await axios.get(path+'?api_token='+authCtx.token+'&lead_type_id='+status)
            .then(res => {
                console.log(status+"Response of leads api : ",res.data.status);
                if(res.data.status === "success"){
                    setLeadLists(res.data.data.leads);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);
                }
            })

        setListLoading(false);
    }

    const SearchLeadHandler = (keyword) => {
        let kw = keyword;
        let re = new RegExp(kw, 'gi');
        let data = lead_lists.filter(function(obj) {
            return obj.name.match(re);
        });
        setFilteredData(data);
        setShowSearchResults(true);

        if(keyword.length === 0){
            setShowSearchResults(false);
        }

    }

    useEffect(() => {
        fetchLeads(props.lead_type_id,status);
        if(typeof id !== "undefined"){
            SwitchLeadHandler(id);
        }
    },[props.lead_type_id,status]);

    if(showSearchResults){
        data = filteredData;
    }else{
        data = lead_lists;
    }






    return (
        <div className="panel-container">
            <div className="panel-left">

                <LeadFilter key={key} onStatusChange={SwitchStatusHandler} onSearch={SearchLeadHandler} />
                {list_loading ? <Loader   type="ThreeDots"
                                          color="#000"
                                          height={30}
                                          width={30}/>:
                    <LeadLists  onSwitchLead={SwitchLeadHandler} lead_lists={data}/>
                }


            </div>
            <div className="splitter-icon"></div>
            <div className="panel-right">
                {detail_loading ? <div className="box-shadow pad-10 lead-right-item"><Loader   type="ThreeDots"
                                          color="#000"
                                          height={30}
                                                                                               width={30}/></div>: <LeadDetail onLeadupdate={SwitchLeadHandler} lead_data={leadData}/>}

            </div>
        </div>
        );
}

export default LeadListingPage;