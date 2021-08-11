import {Link} from "react-router-dom";

const LeftMenu = () => {
    return (
        <div className="nice-nav  left-menu-active">
            <div className="clear"></div>
            <div className="navigationbar">
                <ul>
                    <li>
                        <Link to="/"> <i className="ri-cloud-line"></i>  Leads </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftMenu;