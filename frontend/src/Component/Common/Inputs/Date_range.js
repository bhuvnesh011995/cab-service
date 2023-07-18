export default function Date_range({ lebel_text, setInput, setKey }) {
    return (
      <div
        className="input-daterange input-group"
        id="datepicker6"
        data-date-format="dd M, yyyy"
        data-date-autoclose="true"
        data-provide="datepicker"
        data-date-container="#datepicker6"
        style={{width:"200px"}}
      >
        <input
          type="date"
          className="form-control"
          name="start"
          placeholder="Start Date"
        />
        <input
          type="date"
          className="form-control"
          name="end"
          placeholder="End Date"
        />
      </div>
      //   <div className="filter">
      //   <lebel>{lebel_text}</lebel>
      //   <input
      //     onChange={(e) =>
      //       setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }))
      //     }
      //     type="date"
      //   />
      // </div>
    );
  }
  