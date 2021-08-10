import { toast } from "react-toastify";

const notify = (status,code,message) => {

    if(status === "error"){
        return toast.error(<div>{message}</div>);
    }

    if(message === null){
        return toast('Task was processed');
    }

    toast(message);
}


export default notify;