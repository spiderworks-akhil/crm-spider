const RequirementHistory = (props) => {
    return (
        <div className="dropdown-menu dropdown-menu-right w-max-300" >
        <ol className="chat">
            <li className="other">
                <div className="msg">
                    <div className="user">User</div>
                    <p>{props.orginalRequirment} </p>
                </div>
            </li>
            <li className="self">
                <div className="msg">
                    <div className="user">Staff <span className="range admin">Admin</span></div>
                    <p>{props.modifiedRequirment}</p>
                </div>
            </li>
        </ol>
        </div>
    );
}

export default RequirementHistory;