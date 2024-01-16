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

const initialFilter = {
  country: "",
  state: "",
  city: "",
  vehicleType: "",
  status: "",
};
const url = BASE_URL + "/individualFare/";
export default function IndividualFareManagement() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [fareModal, setFareModal] = useState(false);
  const [fareViewModal, setFareViewModal] = useState(false);

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.allIndiFare?.map((ele, i) => {
            arr.push({
              index: i + 1,
              id: ele._id,
              country: ele.country?.name,
              state: ele.state?.name || "NA",
              city: ele.city?.name || "NA",
              vehicleType: ele.vehicleType?.name || "NA",
              status: ele.status,
              createdAt: ele.createdAt || "NA",
            });
          });
          setList(arr);
        }
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${url}?country=${
        filter.country +
        "&state=" +
        filter.state +
        "&city=" +
        filter.city +
        "&vehicleType=" +
        filter.vehicleType +
        "&status=" +
        filter.status
      }`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.allIndiFare?.map((ele, i) => {
            arr.push({
              index: i + 1,
              country: ele.country?.name,
              state: ele.state?.name || "NA",
              city: ele.city?.name || "NA",
              vehicleType: ele.vehicleType?.name || "NA",
              status: ele.status,
              createdAt: ele.createdAt || "NA",
            });
          });
          setList(arr);
        }
      });
  }

  const deleteModel = (rowId) => {
    const deleteUrl = BASE_URL + "/individualFare/" + rowId;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const filterModel = list.filter((data) => data.id !== rowId);
          setList(filterModel);
          setIsOpen(false);
          return response.json();
        }
      })
      .then((item) => {
        if (item.success) toast.success(item.message);
        else toast.error.apply(item.message);
      })
      .catch((error) => {
        console.error("Error occurred while deleting admin:", error);
      });
  };

  const updateFareData = (data, type, index) => {
    setId(data?.id);
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

  function handleClick2() {}
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
                btn1_title={"Search"}
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
        data={list}
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
