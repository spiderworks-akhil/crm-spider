const Phone = (props) => {
    const ChangeLead = () => {
        props.showModal();
    }
    return (
        <div className="col-md-3 pl-0">
            <div className="lead-details-item">
                        <span className=" d-flex align-items-center" onClick={ChangeLead}>
                             <i className="ri-phone-line" data-toggle="tooltip" data-placement="bottom"
                                title="user phone number"></i>  <b> {props.phone}</b>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Phone;