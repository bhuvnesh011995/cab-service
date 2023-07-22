import { useState } from "react";

export default function VehicletypeCheckbox({city,setCity, ele, i }) {
  const [checked, setChecked] = useState(false);
  const [ service, setService ] = useState([]);

  let runMode = ele.runMode.map((ele, i) => {
    return (
      <div key={i} className="form-check form-check-primary mb-3">
        <input disabled={!checked} value={ele.name} className="form-check-input" type="checkbox" />
        <label className="form-check-label">{ele.name}</label>
      </div>
    );
  });

  function handleChange(e) {
    setChecked(!checked)
    if(e.target.checked){
        setCity(preVal=>({...preVal,vehicleService:[...preVal.vehicleService,{[ele.name]:service}]}))
        
    }else{
        console.log(city.vehicleService)
        let arr = city.vehicleService?.filter((ele)=>{
            
            console.log(Object.keys(ele)[0])
            console.log(e.target.value)
            return e.target.value!=Object.keys(ele)[0]
        })
        setCity(preVal=>({...preVal,vehicleService:arr}))
    }
  }

  return (
    <div className="vehicleService" key={i}>
      <div>
        <div className="form-check form-check-primary mb-3">
          <input
            onChange={e=>handleChange(e)}
            className="form-check-input"
            type="checkbox"
          />
          <label className="form-check-label">{ele.name}</label>
        </div>
      </div>
      <div className="runMode">{runMode}</div>
    </div>
  );
}
