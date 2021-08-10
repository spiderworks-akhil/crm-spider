import axios from "axios/index";
import {useState,useEffect,useContext} from  "react";
import {Spinner} from "react-bootstrap"
import notify from "../../../../Helpers/Helper";
import AuthContext from "../../../../Auth/Auth";
import Select from 'react-select'

const ThirdParty = (props) => {

    const authCtx = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [productName, setProductName] = useState('');
    const [assignedProductName, setAssignedProductName] = useState(props.lead_data.other_product);

    const [vendorId, setVendorId] = useState('');

    // const [productOptions, setProductOptions] = useState([]);
    // const [vendorOptions, setVendorOptions] = useState([]);


    const fetchVendors = async () => {
        let path = "vendors";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {
console.log(res.data);
            if(res.data.status === "success"){
                setVendors(res.data.data.vendors);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }

            }
        })
    }

    const fetchProducts = async () => {
        let path = "products";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setProducts(res.data.data.products);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }

            }
        })
    }

    let productOptions = products.map(function (obj) {
        return { value: obj.id, label: obj.product_name };
    })

    let vendorOptions = vendors.map(function (obj) {
        return { value: obj.id, label: obj.name };
    })

    useEffect(() => {
        fetchProducts();
        fetchVendors();
    },[])

    const ProductChangeHandler = (e) => {;
        assignProduct(e.value);
    }

    const ProductNameChangeHandler = (e) => {;
        setProductName(e.target.value);
    }

    const VendorChangeHandler = (e) => {
        setVendorId(e.value);
    }

    const assignProduct = async (id) => {
        let path = "leads/assign-to-product";
        let data = {leads_id:props.lead_id,products_id:id};
        await axios.post(path+'?api_token='+authCtx.token,data).then(res => {
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }
            }
        })
    }

    const assignVendor = async () => {
        let path = "leads/assign-to-vendor";
        let data = {leads_id:props.lead_id,vendors_id:vendorId,notify:0};
        await axios.post(path+'?api_token='+authCtx.token,data).then(res => {
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }
            }
        })
    }

    const assignProductName = async () => {


        let data = {leads_id:props.lead_id,products_id:productName};

        await axios.post('leads/assign-to-product?api_token='+authCtx.token,data)
            .then(res => {
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    setAssignedProductName(res.data.data.other_product);
                    props.onAssign(props.lead_id);
                }else{
                    if(res.data.errors){
                        let errors = (res.data.errors.errors);
                        for(const [key, value] of  Object.entries(errors)){
                            notify('error',res.data.code,value);
                        }
                    }
                }
        })
    }

    const assignVendorAndNotify = async () => {
        let path = "leads/assign-to-vendor";
        let data = {leads_id:props.lead_id,vendors_id:vendorId,notify:1};
        await axios.post(path+'?api_token='+authCtx.token,data).then(res => {
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }
            }
        })
    }

    return (
        <div className="row">

            <div className="col-md-6">

                <div className="col-md-12">
                    {typeof assignedProductName !== "undefined" && assignedProductName !== null ? <p>Assigned product - {assignedProductName}</p> : <p /> }
                    {typeof props.lead_data.product !== "undefined" && props.lead_data.product !== null ? <p>Assigned product - {props.lead_data.product.product_name}</p> : <p /> }

                </div>

                <label>Choose a product</label>
                <Select options={productOptions} onChange={ProductChangeHandler}/>
                <small>Or, If not able to find the product in above list, please mention it here</small>
                <input className="form-control" type="text" onChange={ProductNameChangeHandler} placeholder="Enter the name of product"/>

                {productName.length > 0 ?
                    <div>
                        <hr/>
                        <button className="btn btn-dark mr-1" onClick={assignProductName}>Assign</button>
                    </div>
                    :
                    <div />
                }
            </div>
            <div className="col-md-6">

                <div className="col-md-12">
                    {typeof props.lead_data.vendor !== "undefined" && props.lead_data.vendor !== null ? <p>Assigned vendor - {props.lead_data.vendor.name}</p> : <p /> }
                </div>

                <label>Choose a vendor</label>
                <Select options={vendorOptions} onChange={VendorChangeHandler}/>
                <hr/>
                <button className="btn btn-dark mr-1" onClick={assignVendor}>Assign silently</button>
                <button className="btn btn-success"  onClick={assignVendorAndNotify}>Assign with vendor notification</button>
            </div>
        </div>
        );
}

export default ThirdParty;
