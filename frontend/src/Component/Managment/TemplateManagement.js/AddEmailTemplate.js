import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'


const initialTemplate = {
  title: "",
  status: "",
  forUsers: "",
  subject: "",
};
export default function AddEmailTemplate() {
  const [template, setTemplate] = useState(initialTemplate);
  const [body,setBody] = useState("")

  return (
    <Management_container title={"Create Email Template"}>
      <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <form className="w-100">
                <Text_Input
                  input={template}
                  setInput={setTemplate}
                  lebel_text={"Title"}
                  setKey={"title"}
                />
                <div className="m-3 w-60">
                  <label className="form-label">Subject :</label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setTemplate((preVal) => ({
                        ...preVal,
                        subject: e.target.value,
                      }))
                    }
                    type={"text"}
                    placeholder={"Enter Subject ..."}
                  />
                </div>
                <Selection_Input options={["ACTIVE","INACTIVE"]} input={template} setInput={setTemplate} setKey={"status"} lebel_text={"Status :"} />
                <Selection_Input options={["ADMIN","DRIVER","RIDER"]} input={template} setInput={setTemplate} lebel_text={"For User :"} />
                <ReactQuill value={body} onChange={setBody} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
