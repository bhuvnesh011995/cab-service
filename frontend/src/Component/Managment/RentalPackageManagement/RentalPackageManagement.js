import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";

import { CommonDataTable } from "../../../Common/commonDataTable";
import { packageTableHeaders } from "../../../constants/table.contants";
import { useDispatch } from "react-redux";
import {
  addPackageReducer,
  getAllPackages,
} from "../../../Redux/features/packageReducer";

const initialFilter = {
  name: "",
  status: "",
};
const url = BASE_URL + "/rentalPackage/filter/";
export default function RentalPackageManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);

  useEffect(() => {
    dispatch(getAllPackages(filter));
  }, []);

  function handleClick(e) {
    e.preventDefault();
    navigate("/addPackage");
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${url}?name=${filter.name}&status=${filter.status}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.packages?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              maxDuration: ele.maxDuration,
              maxDistance: ele.maxDistance.$numberDecimal,
              status: ele.status,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
        }
      });
  }

  const deleteModel = (rowId) => {
    const deleteUrl = BASE_URL + "/rentalPackage/" + rowId;

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

  function handleClick2(e) {
    e.preventDefault();
  }

  const updatePackages = (data, type, index) => {
    console.log(data, type, index);
  };

  return (
    <Management_container title={"Rental Package Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add New"} />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"reset"}
                options={["name", "status"]}
              />
            </div>
          </div>
        </div>
      </div>

      <CommonDataTable
        tableHeaders={packageTableHeaders}
        data={list}
        actionButtons
        deleteButton
        editButton
        viewButton
        callback={(data, type, index) => updatePackages(data, type, index)}
      />
    </Management_container>
  );
}
