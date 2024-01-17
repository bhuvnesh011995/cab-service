import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
// import Table from "../../Common/Table";
import { useEffect, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";
// import { MaterialReactTable } from "material-react-table";
// import { Box, IconButton } from "@mui/material";
// import {
//   RemoveRedEye,
//   Lock,
//   ModeEditOutline,
//   DeleteForever,
// } from "@mui/icons-material/";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { fareManagementTableHeaders } from "../../../constants/table.contants";
import AddIndividualFare from "./AddIndividualFare";
import {
  allFares,
  deleteFare,
  fetchAllFares,
} from "../../../Redux/features/individualFareReducer";
import { useDispatch, useSelector } from "react-redux";

const initialFilter = {
  country: "",
  state: "",
  city: "",
  vehicleType: "",
  status: "",
};

export default function IndividualFareManagement() {
  const dispatch = useDispatch();
  const fares = useSelector(allFares);
  const [filter, setFilter] = useState(initialFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [fareModal, setFareModal] = useState(false);
  const [fareViewModal, setFareViewModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllFares(filter));
  }, [filter]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const deleteModel = () => {
    dispatch(deleteFare(id));
    setIsOpen(false);
  };

  const updateFareData = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setFareViewModal(true);
      setIsOpen(false);
    } else if (type == "delete") {
      setDeleteInfo(data);
      setFareViewModal(false);
      setIsOpen(true);
    } else {
      setFareViewModal(false);
      setIsOpen(false);
    }
    if (type != "delete") setFareModal(true);
  };

  function handleClick2() {
    setFilter(initialFilter);
  }
  return (
    <Management_container title={"Individual Fare Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={deleteModel}
              arg={id}
            />
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => updateFareData()}
                  title={"Add New"}
                />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"reset"}
                options={["country", "state", "city", "status", "vehicleType"]}
              />
            </div>
          </div>
        </div>
      </div>

      <CommonDataTable
        data={fares}
        tableHeaders={fareManagementTableHeaders}
        actionButtons
        viewButton
        editButton
        deleteButton
        callback={(e, type, index) => updateFareData(e, type, index)}
      />
      {fareModal && (
        <AddIndividualFare
          fareId={id}
          setShow={setFareModal}
          show={fareModal}
          viewModal={fareViewModal}
        />
      )}
    </Management_container>
  );
}
