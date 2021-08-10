const SingleStage = (props) => {
    const handleStageClick = () => {
        props.onStageClick(props.id,props.name,props.actions);
    }
    return <div className={props.current == 1 ? "step d-flex align-items-center progress-4-cntr current" : "step d-flex align-items-center progress-4-cntr"} onClick={handleStageClick}>
                    <span>
                       <a  >
                          <div className="form-group form-check m-0 p-0 tag-radio">
                             <input type="radio" className="form-check-input" id="progCheck1" checked={props.finished == 1 ? true : false} onClick={handleStageClick} />
                             <label className="form-check-label" onClick={handleStageClick}>{props.name}</label>
                          </div>
                       </a>
                    </span>
    </div>;
}

export default SingleStage;