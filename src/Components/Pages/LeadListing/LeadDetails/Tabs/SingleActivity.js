import moment from "moment"
import "./SingleActivity.css"

const SingleActivity = (props) => {
    let date = props.item.log_date;
    date = moment(date).fromNow();
    return <div className="row">
        <div className="col-md-2">
            <div className="message-day backday">
            <p className="left-time">{date} <br/>{props.item.user.name} <br/> <span className="badge badge-primary">{props.item.log_type}</span></p>
            </div>
        </div>
        <div className="col-md-10">
            <div className="message-item" id="m16">
                <div className="message-inner">
                    <div className="qa-message-content">
                        {props.item.description}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default SingleActivity;