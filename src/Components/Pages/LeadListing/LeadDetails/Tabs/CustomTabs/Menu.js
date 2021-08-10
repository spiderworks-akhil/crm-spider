import axios from "axios/index";
import notify from "../../../../../Helpers/Helper";
import {useState, useContext, useEffect} from "react";
import AuthContext from "../../../../../Auth/Auth";

const Menu = (props) => {

    const [showThirdPartyTab , setShowThirdPartyTab] = useState(true);

    const handleMenuClick = () => {
        props.onPress(props.id)
    }

    return <li className="nav-item" role="presentation">
                <a className={props.show == props.id ? "nav-link active" : "nav-link"} data-toggle="pill" role="tab"
                   aria-controls="pills-Calls" aria-selected="false" onClick={handleMenuClick}>{props.name}</a>
            </li>;

}

export default Menu;