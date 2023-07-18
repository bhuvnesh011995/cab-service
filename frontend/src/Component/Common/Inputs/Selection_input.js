import "../common.css";

export default function Selection_Input({
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
        defaultValue={input?.setKey}
        onChange={(e) => {
          setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }));
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
