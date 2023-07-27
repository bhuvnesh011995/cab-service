import "../common.css";

export default function Selection_Input({
  reset,
  options,
  input,
  lebel_text,
  setInput,
  setKey,
}) {
  let optionList = options?.map((ele,i)=>{
    return(
      <option key={i} value={ele}>{ele.toLowerCase()}</option>
    )
  })

  return (
    <div className="m-3">
      <label className="form-label">{lebel_text}</label>
      <select
        name="selectedStatus"
        key={`my_unique_select_key__${input[setKey]}`}
        value={input[setKey] || ''}
        onChange={(e) => {
          let obj = {[setKey]:e.target.value}
          if(reset){
            reset.forEach(ele=>obj[ele]= "")
          }
          setInput((preVal) => ({ ...preVal, ...obj }));
        }}
        className="select2"
      >
        <option value="">select</option>
        {optionList}
        {/* <option value="INACTIVE">Inactive</option>
        <option value="ACTIVE">Active</option> */}
      </select>
    </div>

    // <div className="filter">
    //     <lebel>{lebel_text}</lebel>
    //     <select
    //       name="selectedStatus"
    //       defaultValue={input.status}
    //       onChange={(e) => {
    //         setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }));
    //       }}
    //     >
    //       <option value="">null</option>
    //       <option value="INACTIVE">Inactive</option>
    //       <option value="ACTIVE">Active</option>
    //     </select>
    //   </div>
  );
}
