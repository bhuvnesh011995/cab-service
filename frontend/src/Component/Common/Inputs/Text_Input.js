export default function Text_Input({input, lebel_text, setKey, setInput }) {
  
  return (
    <div className="m-3">
      <label  >
        {lebel_text}
      </label>
        <input onChange={e=>setInput(preVal=>({...preVal,[setKey]:e.target.value}))}
          type="text"
          placeholder={setKey}
          // value={input[setKey]}
        />
    </div>
    // <div className="filter">
    //     <lebel>{lebel_text}</lebel>
    //     <input
    //       onChange={(e) =>
    //         setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }))
    //       }
    //       type="text"
    //       placeholder={setKey}
    //     />
    //   </div>
  );
}
