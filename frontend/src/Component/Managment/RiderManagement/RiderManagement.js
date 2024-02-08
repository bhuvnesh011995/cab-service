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
import { IMAGE_URL } from "../../../config/config";

const initialState = {
  search: "",
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
                  <div className='col-lg-6'>
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"search"}
                      lebel_text={"Search :"}
                    />
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
                changeSelectedColumnDataDesign={["profilePhoto", "name"]}
                changedDataCellColumn={(header, accessor) => {
                  if (accessor == "profilePhoto")
                    return {
                      header: header,
                      Cell: ({ row }) => (
                        <div className='d-flex align-items-center justify-content-center'>
                          <img
                            width={"50px"}
                            height={"50px"}
                            style={{ borderRadius: "50%" }}
                            src={IMAGE_URL + row.original.userImage}
                          />
                        </div>
                      ),
                    };
                  else if (accessor == "name")
                    return {
                      header: header,
                      Cell: ({ row }) => (
                        <div>
                          {row.original.firstName + " " + row.original.lastName}
                        </div>
                      ),
                    };
                }}
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
