import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useEffect, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { riderTableHeaders } from "../../../constants/table.contants";
import AddRider from "./AddRider";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRiderReducer,
  getAllRiders,
  getRiders,
} from "../../../Redux/features/riderReducer";
import DeleteModal from "../../DeleteModel/DeleteModel";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  status: "",
};
export default function RiderManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialState);
  const [id, setId] = useState(null);
  const [viewRiderManagement, setViewRiderManagement] = useState(false);
  const [deleteRiderManagement, setDeleteRiderManagement] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [riderManagementModal, setRiderManagementModal] = useState(false);
  const riders = useSelector(getRiders);

  useEffect(() => {
    dispatch(getAllRiders(filter));
  }, [filter]);

  const updateRiderManagement = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewRiderManagement(true);
      setDeleteRiderManagement(false);
    } else if (type == "delete") {
      setViewRiderManagement(false);
      setDeleteRiderManagement(true);
      setDeleteInfo(data);
    } else {
      setViewRiderManagement(false);
      setDeleteRiderManagement(false);
    }
    if (type !== "delete") setRiderManagementModal(true);
  };

  function reset() {
    setFilter({ ...initialState });
  }

  const deleteModel = () => {
    dispatch(deleteRiderReducer(id));
  };

  return (
    <Management_container title={"Rider Management"}>
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
                  handleClick={() => updateRiderManagement()}
                  title={"Add Rider"}
                />
              </div>
              <form style={{ margin: "50px" }}>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"name"}
                      lebel_text={"Name :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"email"}
                      lebel_text={"Email :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"mobile"}
                      lebel_text={"Mobile :"}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status : "}
                      setKey={"status"}
                    />

                    <div style={{ margin: "20px", marginTop: "50px" }}>
                      <BtnDark handleClick={reset} title={"Reset"} />
                    </div>
                  </div>
                </div>
              </form>

              <CommonDataTable
                data={riders}
                tableHeaders={riderTableHeaders}
                actionButtons
                editButton
                deleteButton
                viewButton
                callback={(data, type, index) =>
                  updateRiderManagement(data, type, index)
                }
                // changeSelectedColumnDataDesign={["profilePhoto"]}
                // changedDataCellColumn={(header,accesor) => {
                //   return {
                //     header:header,
                //     Cell:({row}) => <div>
                //       <img src={}/>
                //     </div>
                //   }

                // }}
              />
            </div>
          </div>
        </div>
      </div>
      {riderManagementModal && (
        <AddRider
          show={riderManagementModal}
          setShow={setRiderManagementModal}
          viewModal={viewRiderManagement}
          id={id}
        />
      )}
      <DeleteModal
        info={deleteInfo}
        show={deleteRiderManagement}
        setShow={setDeleteRiderManagement}
        handleDelete={deleteModel}
        arg={id}
      />
    </Management_container>
  );
}
