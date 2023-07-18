export default function Date_input({lebel_text,setInput,setKey}){
    return(
        <div className="m-3">
        <lebel>{lebel_text}</lebel>
        <input
          onChange={(e) =>
            setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }))
          }
          type="date"
        />
      </div>
    )
}