import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import { useEffect, useState } from "react";
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
import moment from "moment";
import Filter_Option from "../../Common/Filter_option";
import Text_Input from "../../Common/Inputs/Text_Input";

const initialFilter = {
  search: "",
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
                options={[
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
        data={fares}
        tableHeaders={fareManagementTableHeaders}
        actionButtons
        viewButton
        editButton
        deleteButton
        callback={(e, type, index) => updateFareData(e, type, index)}
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
