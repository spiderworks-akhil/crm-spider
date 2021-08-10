import LeadSingleList from './LeadSingleList'
import {useState} from 'react';

const LeadLists = (props) => {

    const [activeItem,SetActiveItem] = useState("");

    if (props.lead_lists.length === 0) {
        return (<p>No leads.</p>);
    }

    const LeadSelectionHandler = (id) => {
        SetActiveItem(id);
        props.onSwitchLead(id);
    }

    return (
        <div className="name-list-cntr">
            {props.lead_lists.map(obj => <LeadSingleList active={activeItem} onLeadSelction={LeadSelectionHandler}  data={obj} key={obj.id} />)}
        </div>
    );
}

export default LeadLists;