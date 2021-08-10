const DateTime = (props) => {

    const date1 = new Date(props.date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

    let date =  new Date(props.date);
    date = new Intl.DateTimeFormat('en', { year: 'numeric' ,  month: 'short', day: '2-digit'}).format(date);
    return (
        <div className="col-md-3 pl-0">
            <div className="lead-details-item">
                        <span className=" d-flex align-items-center">
                            <i className="ri-calendar-line" data-toggle="tooltip" data-placement="bottom"
                               title="Creaed date"></i><b> {date}</b>

                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default DateTime;