import { useState, useEffect } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import DeleteModal from "../../DeleteModel/DeleteModel";
import Management_container from "../../Common/Management_container";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { tollTableHeaders } from "../../../constants/table.contants";
import AddToll from "./AddToll";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTollReducer,
  getAllTollReducer,
  getAllTolls,
} from "../../../Redux/features/tollReducer";
import Filter_Option from "../../Common/Filter_option";

const initialFilter = {
  search: "",
  status: "",
};
export default function TollManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [showTollModal, setShowTollModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const allTolls = useSelector(getAllTolls);

  useEffect(() => {
    dispatch(getAllTollReducer(filter));
  }, [filter]);

  const deleteModel = () => {
    dispatch(deleteTollReducer(id));
  };

  const updateTollData = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewModal(true);
      setDeleteModal(false);
    } else if (type == "delete") {
      setViewModal(false);
      setDeleteModal(true);
      setDeleteInfo(data);
    } else {
      setViewModal(false);
      setDeleteModal(false);
      setDeleteInfo(data);
    }
    if (type !== "delete") setShowTollModal(true);
  };

  return (
    <Management_container title={"Toll Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <DeleteModal
              info={deleteInfo}
              show={deleteModal}
              setShow={setDeleteModal}
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
                  handleClick={() => updateTollData()}
                  title={"Add Toll"}
                />
              </div>
              <div className='row'>
                <Filter_Option
                  input={filter}
                  setInput={setFilter}
                  initialInput={initialFilter}
                  options={["status", "search"]}
                />
              </div>
              <CommonDataTable
                data={allTolls}
                tableHeaders={tollTableHeaders}
                actionButtons
                editButton
                deleteButton
                viewButton
                callback={(data, type, index) =>
                  updateTollData(data, type, index)
                }
                changeSelectedColumnDataDesign={["createdAt"]}
                changedDataCellColumn={(header, accessor) => {
                  return {
                    accessorKey: accessor,
                    header: header,
                    Cell: ({ row }) => (
                      <div>
                        {moment(row.original.createdAt).format("YYYY-DD-MM")}
                      </div>
                    ),
                  };
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showTollModal && (
        <AddToll
          isOpen={showTollModal}
          setIsOpen={setShowTollModal}
          tollId={id}
          viewToll={viewModal}
        />
      )}
    </Management_container>
  );
}
