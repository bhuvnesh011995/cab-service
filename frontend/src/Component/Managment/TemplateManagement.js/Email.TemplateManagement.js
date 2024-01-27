import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { emailTamplateTableHeaders } from "../../../constants/table.contants";
import AddEmailTemplate from "./AddEmailTemplate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailTemplateReducer,
  fetchEmailTemplates,
  getEmailTemplates,
} from "../../../Redux/features/emailTemplateReducer";
import DeleteModal from "../../DeleteModel/DeleteModel";
const initialfilter = {
  title: "",
  status: "",
  forUsers: "",
};
export default function EmailTemplateManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialfilter);

  const [id, setId] = useState(null);
  const [viewEmailTemplate, setViewEmailTemplate] = useState(false);
  const [deleteEmailTemplate, setDeleteEmailTemplate] = useState(false);
  const [emailTemplateModal, setEmailTemplateModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const emailTemplates = useSelector(getEmailTemplates);

  useEffect(() => {
    dispatch(fetchEmailTemplates(filter));
  }, [filter]);

  const updateEmailTemplates = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewEmailTemplate(true);
      setDeleteEmailTemplate(false);
    } else if (type == "delete") {
      setViewEmailTemplate(false);
      setDeleteEmailTemplate(true);
      setDeleteInfo(data);
    } else {
      setViewEmailTemplate(false);
      setDeleteEmailTemplate(false);
    }
    if (type !== "delete") setEmailTemplateModal(true);
  };

  function reset() {
    setFilter({ ...initialfilter });
  }

  const handleDelete = () => {
    dispatch(deleteEmailTemplateReducer(id));
  };

  return (
    <Management_container title={"Email Template"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => updateEmailTemplates()}
                  title={"Add New"}
                />
              </div>
              <div className='row'>
                <div className='col-lg-2 inputField'>
                  <Text_Input
                    input={filter}
                    setInput={setFilter}
                    lebel_text={"Title"}
                    setKey={"title"}
                  />
                  <Selection_Input
                    options={["ADMIN", "DRIVER", "RIDER"]}
                    input={filter}
                    setInput={setFilter}
                    lebel_text={"For Users"}
                    setKey={"forUsers"}
                  />
                  <Selection_Input
                    options={["ACTIVE", "INACTIVE"]}
                    input={filter}
                    setInput={setFilter}
                    lebel_text={"Status :"}
                    setKey={"status"}
                  />
                  <div style={{ margin: "20px", marginTop: "50px" }}>
                    <BtnDark handleClick={reset} title={"Reset"} />
                  </div>
                </div>
              </div>
              <CommonDataTable
                tableHeaders={emailTamplateTableHeaders}
                data={emailTemplates}
                actionButtons
                editButton
                viewButton
                deleteButton
                callback={(data, type, index) =>
                  updateEmailTemplates(data, type, index)
                }
                changeSelectedColumnDataDesign={["forUsers"]}
                changedDataCellColumn={(header, accesor) => {
                  if (accesor == "forUsers") {
                    return {
                      accesorKey: accesor,
                      header: header,
                      Cell: ({ row }) => (
                        <div>
                          {row.original.forUsers.map(
                            (user) => user.label + " , ",
                          )}
                        </div>
                      ),
                    };
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        info={deleteInfo}
        show={deleteEmailTemplate}
        setShow={setDeleteEmailTemplate}
        handleDelete={handleDelete}
        arg={id}
      />
      {emailTemplateModal && (
        <AddEmailTemplate
          setShow={setEmailTemplateModal}
          show={emailTemplateModal}
          viewModal={viewEmailTemplate}
          id={id}
        />
      )}
    </Management_container>
  );
}
