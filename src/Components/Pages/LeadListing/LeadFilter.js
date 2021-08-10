import notify from "../../Helpers/Helper";
import axios from "axios/index";
import {useEffect, useState} from "react";

const LeadFilter = (props) => {
    const [leadTypes,setleadTypes] = useState([]);


    const onStatusChangeHandler = (event) => {
        props.onStatusChange(event.target.value);
    }

    const onSearchChangeHandler = (event) => {
        props.onSearch(event.target.value);
    }



    return (
        <div>
            <form className="form-inline first-form select-with-bg marg-bot-10 w-min-100">
                <select className="form-control full-width" onChange={onStatusChangeHandler}>
                    <option value="unassigned-leads">Get unassigned leads</option>
                    <option value="my-leads">Get my leads</option>
                    <option value="my-branch-leads">Get branch leads</option>
                    <option value="my-favourite-leads">Get favourite leads</option>
                </select>
            </form>

            <div className="box-shadow pad-10 lead-left-item marg-bot-10">
                <input type="text" className="form-control" placeholder="Search lead" onKeyUp={onSearchChangeHandler}/>
            </div>
        </div>


    );
}

export default LeadFilter;