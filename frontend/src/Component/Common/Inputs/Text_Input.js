export default function Text_Input({
  input,
  type,
  isDisabled,
  lebel_text,
  setKey,
  setInput,
}) {
  return (
    <div className='m-3'>
      <label className='form-label'>{lebel_text}</label>
      <input
        disabled={isDisabled}
        className='form-control'
        onChange={(e) =>
          setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }))
        }
        value={input[setKey]}
        type={type || "text"}
        placeholder={setKey}
        // value={input[setKey]}
      />
    </div>

    // {/* <div className="mb-3">
    // <label for="formrow-firstname-input" className="form-label">First Name</label>
    // <input type="text" className="form-control" id="formrow-firstname-input" placeholder="Enter Your First Name">
    // </div> */}
    //   <div className="row mb-4">
    //   <label for="horizontal-firstname-input" className="col-sm-3 col-form-label">First name</label>
    //   <div className="col-sm-9">
    //     <input type="text" className="form-control" id="horizontal-firstname-input" placeholder="Enter Your ">
    //   </div>
    // </div>

    // <div classNameName="filter">
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
