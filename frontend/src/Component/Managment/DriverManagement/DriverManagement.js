import Management_container from "../../Common/Management_container";
import { useEffect, useState } from "react";
import DriverDetails from "./DriverDetails";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { driverTableHeaders } from "../../../constants/table.contants";
import AddDriver from "./AddDriver";
import Filter_Option from "../../Common/Filter_option";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDriverReducer,
  fetchAllDrivers,
  getAllDrivers,
} from "../../../Redux/features/driverReducer";
import DeleteModal from "../../DeleteModel/DeleteModel";

const initialFilter = {
  search: "",
  status: "",
  licExp: false,
  docPen: false,
  approved: false,
};

export default function DriverManagement() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [driver, setDriver] = useState(null);

  const [id, setId] = useState(null);
  const [viewDriver, setViewDriver] = useState(false);
  const [deleteDriver, setDeleteDriver] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const drivers = useSelector(getAllDrivers);

  useEffect(() => {
    dispatch(fetchAllDrivers(filter));
  }, [filter]);

  function reset() {
    initialFilter.licExp = false;
    setFilter({ ...initialFilter });
  }

  const updateDrivers = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewDriver(true);
      setDeleteDriver(false);
    } else if (type == "delete") {
      setViewDriver(false);
      setDeleteDriver(true);
      setDeleteInfo(data);
    } else {
      setViewDriver(false);
      setDeleteDriver(false);
    }
    if (type !== "delete") setDriverModal(true);
  };

  return (
    <Management_container title={"Driver Management"}>
      {isOpen && (
        <DriverDetails
          driver={driver}
          setDriver={setDriver}
          show={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <DeleteModal
        info={deleteInfo}
        show={deleteDriver}
        setShow={setDeleteDriver}
        handleDelete={() => dispatch(deleteDriverReducer(id))}
        arg={id}
      />

      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  zIndex: "2",
                }}
              >
                <button
                  onClick={() => updateDrivers()}
                  type='button'
                  className='btn m-2 btn-outline-primary waves-effect waves-light'
                >
                  <i class='bi bi-plus-lg'></i>Add Driver
                </button>

                <button
                  onClick={() => {
                    filter.licExp = !filter.licExp;
                    setFilter({ ...filter });
                  }}
                  type='button'
                  className={`btn m-2 btn${
                    filter.licExp ? "" : "-outline"
                  }-primary waves-effect waves-light`}
                >
                  License expired Driver
                </button>

                <button
                  onClick={() => {
                    filter.docPen = !filter.docPen;
                    setFilter({ ...filter });
                  }}
                  type='button'
                  className={`btn m-2 btn${
                    filter.docPen ? "" : "-outline"
                  }-primary waves-effect waves-light`}
                >
                  Doc Approval Pending Driver
                </button>

                <button
                  onClick={() => {
                    filter.approved = !filter.approved;
                    setFilter({ ...filter });
                  }}
                  type='button'
                  className={`btn m-2 btn${
                    filter.approved ? "" : "-outline"
                  }-primary waves-effect waves-light`}
                >
                  Approved Drivers
                </button>
              </div>
              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Filter_Option
                      input={filter}
                      setInput={setFilter}
                      initialInput={initialFilter}
                      options={["search", "status"]}
                    />
                    <div style={{ margin: "20px", marginTop: "50px" }}>
                      <button
                        type='button'
                        className='btn btn-outline-danger'
                        onClick={reset}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <CommonDataTable
                data={drivers}
                tableHeaders={driverTableHeaders}
                actionButtons
                deleteButton
                editButton
                viewButton
                callback={(data, type, index) =>
                  updateDrivers(data, type, index)
                }
                changeSelectedColumnDataDesign={["verified", "documentStatus"]}
                changedDataCellColumn={(header, accessor) => {
                  if (accessor == "documentStatus")
                    return {
                      accessorKey: accessor,
                      header: header,
                      Cell: ({ row }) => (
                        <div className='d-flex align-items-center justify-content-center'>
                          {row.original.aadhar.file.length &&
                          row.original.pan.file.length &&
                          row.original.license.file.length ? (
                            <span
                              className='d-flex align-items-center justify-content-center'
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: "#74E291",
                                fontSize: "19px",
                              }}
                            >
                              <i className=' mdi mdi-checkbox-marked-circle'></i>
                            </span>
                          ) : (
                            <span
                              className='d-flex align-items-center justify-content-center'
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                                fontWeight: "bolder",
                                fontSize: "19px",
                              }}
                            >
                              x
                            </span>
                          )}
                        </div>
                      ),
                    };
                  else if (accessor == "verified")
                    return {
                      accessorKey: accessor,
                      header: header,
                      Cell: ({ row }) => (
                        <div className='d-flex align-items-center justify-content-center'>
                          {row.original.verified ? (
                            <span
                              className='d-flex align-items-center justify-content-center'
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: "#74E291",
                                fontSize: "19px",
                              }}
                            >
                              <i className=' mdi mdi-checkbox-marked-circle'></i>
                            </span>
                          ) : (
                            <span
                              className='d-flex align-items-center justify-content-center'
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                                fontWeight: "bolder",
                                fontSize: "19px",
                              }}
                            >
                              x
                            </span>
                          )}
                        </div>
                      ),
                    };
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {driverModal && (
        <AddDriver
          show={driverModal}
          setShow={setDriverModal}
          viewModal={viewDriver}
          id={id}
        />
      )}
    </Management_container>
  );
}
