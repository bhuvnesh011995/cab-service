export default function Number_Input({input, lebel_text, setKey, setInput }) {
    return(
        <div className="m-3">
      <label className="form-label">
        {lebel_text}
      </label>
        <input className="form-control" onChange={e=>{
            
            setInput(preVal=>({...preVal,[setKey]:e.target.value.replace(/[^0-9.]/g, '')}))}
        }
          type={"text"}
          placeholder={setKey}
          value={input[setKey]}
        />
    </div>
    )
};
