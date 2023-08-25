export default function SelectWithValue({options,input,setInput,setKey,label,reset}) {
    let optionList = options?.map((ele,i)=>{
        return(
          <option key={i} value={ele.value}>{ele.title}</option>
        )
      })
    return(
        <div className="m-3">
      <label className="form-label">{label}</label>
      <select
      style={{width:"200px"}}
        name="selectedStatus"
        key={`my_unique_select_key_${input[setKey]}`}
        value={input[setKey] || ''}
        onChange={(e) => {
          let obj = {[setKey]:e.target.value}
          if(reset){
            reset.forEach(ele=>obj[ele]= "")
          }
          setInput((preVal) => ({ ...preVal, ...obj }));
        }}
        className="form-select"
      >
        <option value="">select</option>
        {optionList}
        {/* <option value="INACTIVE">Inactive</option>
        <option value="ACTIVE">Active</option> */}
      </select>
      </div>
    )
    
};
