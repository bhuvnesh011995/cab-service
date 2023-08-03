export default function Text_Input({input,type, lebel_text, setKey, setInput }) {
  
  return (
    <div class="m-3">
      <label class="form-label">
        {lebel_text}
      </label>
        <input class="form-control" onChange={e=>setInput(preVal=>({...preVal,[setKey]:e.target.value}))}
          type={type|| "text"}
          placeholder={setKey}
          // value={input[setKey]}
        />
    </div>

// {/* <div class="mb-3">
// <label for="formrow-firstname-input" class="form-label">First Name</label>
// <input type="text" class="form-control" id="formrow-firstname-input" placeholder="Enter Your First Name">
// </div> */}
//   <div class="row mb-4">
//   <label for="horizontal-firstname-input" class="col-sm-3 col-form-label">First name</label>
//   <div class="col-sm-9">
//     <input type="text" class="form-control" id="horizontal-firstname-input" placeholder="Enter Your ">
//   </div>
// </div>




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
