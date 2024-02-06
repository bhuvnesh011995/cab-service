import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { packageTableHeaders } from "../../../constants/table.contants";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePackageReducer,
  getAllPackages,
  getPackages,
} from "../../../Redux/features/packageReducer";
import AddRentalPackage from "./AddRentalPackage";
import moment from "moment";
import Text_Input from "../../Common/Inputs/Text_Input";

const initialFilter = {
  search: "",
};

export default function RentalPackageManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const packages = useSelector(getPackages);
  const [viewPackage, setViewPackage] = useState(false);
  const [deletePackage, setDeletePackage] = useState(false);
  const [packageModal, setPackageModal] = useState(false);

  useEffect(() => {
    console.log(filter);
    dispatch(getAllPackages(filter));
  }, [filter]);

  const deleteModel = () => {
    dispatch(deletePackageReducer(id));
    setDeletePackage(false);
  };

  const updatePackages = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewPackage(true);
      setDeletePackage(false);
    } else if (type == "delete") {
      setViewPackage(false);
      setDeletePackage(true);
      setDeleteInfo(data);
    } else {
      setViewPackage(false);
      setDeletePackage(false);
    }
    if (type !== "delete") setPackageModal(true);
  };

  return (
    <Management_container title={"Rental Package Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <DeleteModal
              info={deleteInfo}
              show={deletePackage}
              setShow={setDeletePackage}
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
                  handleClick={() => updatePackages()}
                  title={"Add New"}
                />
              </div>
              <Text_Input
                input={filter}
                setInput={setFilter}
                setKey={"search"}
                lebel_text={"Search :"}
              />
            </div>
          </div>
        </div>
      </div>

      <CommonDataTable
        tableHeaders={packageTableHeaders}
        data={packages}
        actionButtons
        deleteButton
        editButton
        viewButton
        callback={(data, type, index) => updatePackages(data, type, index)}
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
      {packageModal && (
        <AddRentalPackage
          setIsOpen={setPackageModal}
          isOpen={packageModal}
          id={id}
          viewModal={viewPackage}
        />
      )}
    </Management_container>
  );
}
