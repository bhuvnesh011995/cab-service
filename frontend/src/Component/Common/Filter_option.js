import Text_Input from "./Inputs/Text_Input";
import Selection_Input from "./Inputs/Selection_input";
import "./common.css";
import Date_input from "./Inputs/Date_input";
import BtnDark from "./Buttons/BtnDark";
import Date_range from "./Inputs/Date_range";
import { useEffect, useState } from "react";

export default function Filter_Option({
 
  input,
  setInput,
  initialInput,
  options,
  btn1_title,
  btn2_title,
  handleClick1,
  handleClick2,
  children
})
{
  let [countryOption,setCountryOption] = useState([]);
  let [stateOption,setStateOption] = useState([]);

  useEffect(()=>{
      if(options.includes("country")){
      fetch("http://localhost:8080/test/api/v1/country/",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        let arr = [];
        data.forEach(ele=>arr.push(ele.name))
        setCountryOption(arr)
      }
      )
    }
  },[])

  useEffect(()=>{
    if(options.includes("state")){
      fetch("http://localhost:8080/test/api/v1/state/?country="+input?.country,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>
       { 
        let arr = [];
        data.forEach(ele=>arr.push(ele.name))
        setStateOption(arr)
      }
      )
    }
  },[input?.country])



  return (
    <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField" >


          {options.includes("country")&&(
            <Selection_Input
            options={countryOption}
              input={input}
              setInput={setInput}
              lebel_text={"Country : "}
              setKey={"country"}
            />
          )}
          {options.includes("state")&&(
            <Selection_Input
            options={stateOption}
              input={input}
              setInput={setInput}
              lebel_text={"State : "}
              setKey={"state"}
            />
          )}
          {options.includes("name") && (
            <Text_Input
            input={input}
              lebel_text={"Name :"}
              setKey={"name"}
              setInput={setInput}
            />
          )}
          {options.includes("username") && (
            <Text_Input
            input={input}
              lebel_text={"username :"}
              setKey={"username"}
              setInput={setInput}
            />
          )}
          {options.includes("make") && (
            <Text_Input
              input={input}
              lebel_text={"make :"}
              setKey={"make"}
              setInput={setInput}
            />
          )}
          {options.includes("status") && (
            <Selection_Input
            options={["ACTIVE","INACTIVE"]}
              input={input}
              setInput={setInput}
              lebel_text={"Status : "}
              setKey={"status"}
            />
          )}

          {
            options.includes("from")&&<Date_input
            setKey={"from"}
            setInput={setInput}
            lebel_text={"From :"}
            />
        }
        {
            options.includes("to")&&<Date_input
            setKey={"to"}
            setInput={setInput}
            lebel_text={"To :"}
            />
        }
        <div>
            {btn1_title && (
            <BtnDark handleClick={handleClick1} title={btn1_title}/>
          )}
          {btn2_title && (
            <BtnDark handleClick={handleClick2} title={btn2_title}/>
          )}
        </div>

          
        </div>
      </div>
    </form>
  );
}
