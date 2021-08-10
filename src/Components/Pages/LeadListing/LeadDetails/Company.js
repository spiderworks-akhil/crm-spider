const Company = (props) => {
    return (
        <div className="col-md-3 pl-0">
            <div className="lead-details-item">
                        <span className=" d-flex align-items-center">
                           <i className="ri-building-line" data-toggle="tooltip" data-placement="bottom"
                              title="Company"></i> <b> {props.company} </b>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Company;