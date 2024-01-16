export default function Date_input({
  lebel_text,
  setInput,
  setKey,
  isDisabled,
}) {
  return (
    <div class='mb-3'>
      <label class='form-label'>{lebel_text}</label>
      <input
        type='date'
        class='form-control'
        disabled={isDisabled}
        placeholder='dd M, yyyy'
        onChange={(e) =>
          setInput((preVal) => ({ ...preVal, [setKey]: e.target.value }))
        }
      />
    </div>
  );
}

//   div class="mb-4">
//     <label>Auto Close</label>
//     <div class="input-group" id="datepicker2">
//         <input type="text" class="form-control" placeholder="dd M, yyyy"
//             data-date-format="dd M, yyyy" data-date-container='#datepicker2' data-provide="datepicker"
//             data-date-autoclose="true">

//         <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
//     </div><!-- input-group -->
// </div>
