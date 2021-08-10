const LeadSingleList = (props) => {
    let activeClass = "";
    const short_name = props.data.name.substring(0,2).toUpperCase();
    const onClickHandler = (event) => {
        props.onLeadSelction(props.data.id);
    }
    if(props.active === props.data.id){
        activeClass = "active-lead-left";
    }else{
        activeClass = "";
    }


    return (
        <div className={"box-shadow pad-10 lead-left-item lead-left-items "+activeClass+" marg-bot-10"} onClick={onClickHandler}>
            <div className="name-cntr">{short_name}</div>
            <a href="#" className="font-medium ">{props.data.name}</a>
            <p className=" ">{props.data.phone_number}
            </p>
            <div className="clearfix" />
        </div>

);
}

export default LeadSingleList;