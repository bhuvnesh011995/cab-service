import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { rentalTableHeaders } from "../../../constants/table.contants";
import { CommonDataTable } from "../../../Common/commonDataTable";
import moment from "moment";
import AddRentalFare from "./AddRentalFare";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRentalReducer,
  getAllRentals,
  getRentals,
} from "../../../Redux/features/rentalFareReducer";

const initialFilter = {
  search: "",
  package: "",
  country: "",
  state: "",
  city: "",
  vehicleType: "",
  status: "",
};
export default function RentalFareManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [viewRental, setViewRental] = useState(false);
  const [deleteRental, setDeleteRental] = useState(false);
  const [rentalModal, setRentalModal] = useState(false);

  const rentalFares = useSelector(getRentals);
  useEffect(() => {
    dispatch(getAllRentals(filter));
  }, [filter]);

  const updateRentals = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewRental(true);
      setDeleteRental(false);
    } else if (type == "delete") {
      setViewRental(false);
      setDeleteRental(true);
      setDeleteInfo(data);
    } else {
      setViewRental(false);
      setDeleteRental(false);
    }
    if (type !== "delete") setRentalModal(true);
  };

  const deleteModel = () => {
    dispatch(deleteRentalReducer(id));
  };

  function handleClick2() {
    setFilter({ ...initialFilter });
  }
  return (
    <Management_container title={"Rental Fare Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <DeleteModal
              info={deleteInfo}
              show={deleteRental}
              setShow={setDeleteRental}
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
                  handleClick={() => updateRentals()}
                  title={"Add Rental Fare"}
                />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                options={[
                  "package",
                  "country",
                  "state",
                  "city",
                  "vehicleType",
                  "status",
                  "search",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <CommonDataTable
        tableHeaders={rentalTableHeaders}
        data={rentalFares}
        actionButtons
        deleteButton
        editButton
        viewButton
        callback={(data, type, index) => updateRentals(data, type, index)}
        changeSelectedColumnDataDesign={["createdAt"]}
        changedDataCellColumn={(header, accessor) => {
          return {
            accessorKey: accessor,
            header: header,
            Cell: ({ row }) => (
              <div>{moment(row.original.createdAt).format("YYYY-DD-MM")}</div>
            ),
          };
        }}
      />
      {rentalModal && (
        <AddRentalFare
          show={rentalModal}
          setShow={setRentalModal}
          viewModal={viewRental}
          id={id}
        />
      )}
    </Management_container>
  );
}
