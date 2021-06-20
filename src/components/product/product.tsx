import {
    Formik,
    Form,
    Field
  } from 'formik';
import { useEffect, useState } from 'react';
import { getPrices } from '../../api/prices';
import '../../App.css';

export interface FormValues {
    duration: number;
    storage: number;
    upfront: boolean
  
  }
  type ChildProps = {
    nextPhase(values: any) : any;
    priceCalculation(values:any) : any;
    changeConfig(values:any) : any;

  };
const Product : React.FC<ChildProps> = ({nextPhase,priceCalculation,changeConfig}) => {
  const [totalPrice,setTotalPrice] = useState(0);
  const [configPrices,setConfigPrices] = useState([]);
  useEffect(() => {
    
  getPrices().then((res:any)=> {
    setConfigPrices(res?.data?.subscription_plans);
  })
  }, [])
  const calculatePriceDuration =  (values:any) => {
    configPrices?.map((elements:any)=> {
      
if (elements.duration_months === parseInt(values.duration) ) {
  if (!values.upfront) {
    setTotalPrice(elements.price_usd_per_gb  * values.storage);
    priceCalculation(totalPrice);
    changeConfig(values);


  }
  else {
    setTotalPrice(elements.price_usd_per_gb  * values.storage * 0.9);
    priceCalculation(totalPrice);
    changeConfig(values);

  }  

  
}
  return null;

    })
    
  }
    const initialValues: FormValues = { duration: 12 , storage:5 , upfront: false };
    const handleClick = (values:any) => { 
        nextPhase(values);
      }

  return (
<div >
<div className="nav">
    <ul className="mx-auto">
    </ul>
</div>

<Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
             console.log("SUBMITTED");
             actions.setSubmitting(false);
             handleClick(values)
          }}
       >
           {({ values, handleSubmit}) => (
<Form> <span id="card-header">Product settings:</span>
    <div className="row row-1">
    <div className="col-3 "> <a href="/#">Duration</a> </div>
        <div className="col-9"> <Field as="select" name="duration" id="duration" className="row row-1" onClick={calculatePriceDuration(values)}>
  <option value="3">3 Months</option>
  <option value="6">6 Months</option>
  <option value="12" >12 Months</option>
</Field> </div>

    </div>
    <div className="row row-1">
    <div className="col-3 "> <a href="/#">Storage amount</a> </div>
        <div className="col-9"> <Field as="select" name="storage" id="storage" className="row row-1" onClick={calculatePriceDuration(values)}>
  <option value="5" >5 Gigabytes</option>
  <option value="10">10 Gigabytes</option>
  <option value="50" >50 Gigabytes</option>
</Field> </div>

    </div>
    <div className="row row-1">
    <div className="col-5"> <a href="/#">Upfront payment</a> </div>
        <div className="col-7"> 
        <span className="padder">Off</span>
        <label className="switch">
  <Field type="checkbox" name="upfront" />
  <span className="slider round"></span>


</label>
<span className="padder">On</span>
         </div>
    </div> 
    <button className="btn d-flex mx-auto"  onClick={()=>handleSubmit}><b>Proceed</b></button>
</Form>
)}
</Formik>

</div>
  
  );
}

export default Product;
