const Email = (props) => {
    const ChangeLead = () => {
        props.showModal();
    }
    return (
        <div className="col-md-3 pl-0">
            <div className="lead-details-item">
                        <span className=" d-flex align-items-center" onClick={ChangeLead}>
                            <i className="ri-mail-line" data-toggle="tooltip" data-placement="bottom"
                             title="user mail id"></i>  <b> {props.email}</b>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Email;