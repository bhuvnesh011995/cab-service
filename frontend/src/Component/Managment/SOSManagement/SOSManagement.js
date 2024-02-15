import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { sosTableHeaders } from "../../../constants/table.contants";
import AddSos from "./AddSos";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSOSReducer,
  fetchAllSOSs,
  getSOSs,
} from "../../../Redux/features/sosManagementReducer";
import Filter_Option from "../../Common/Filter_option";

const initialFilter = {
  search: "",
};
export default function SOSManagement() {
  const allSoss = useSelector(getSOSs);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [viewSOS, setViewSOS] = useState(false);
  const [deleteSOS, setDeleteSOS] = useState(false);
  const [sosModal, setSOSModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllSOSs(filter));
  }, [filter]);

  function reset() {
    setFilter({ ...initialFilter });
  }

  const updateSOSData = (data, type, index) => {
    setId(data?._id);
    if (type == "view") {
      setViewSOS(true);
      setDeleteSOS(false);
    } else if (type == "delete") {
      setViewSOS(false);
      setDeleteSOS(true);
      setDeleteInfo(data);
    } else {
      setViewSOS(false);
      setDeleteSOS(false);
    }
    if (type !== "delete") setSOSModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteSOSReducer(id));
  };

  return (
    <Management_container title={"SOS Management"}>
      <div className='row'>
        <div className='col-lg-13'>
          <div className='card'>
            <div className='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => updateSOSData()}
                  title={"Add SOS"}
                />
              </div>

              <form className='m-2'>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Filter_Option
                      input={filter}
                      setInput={setFilter}
                      initialInput={initialFilter}
                      options={["search"]}
                    />
                    <div
                      style={{
                        marginTop: "35px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
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
                tableHeaders={sosTableHeaders}
                data={allSoss}
                deleteButton
                editButton
                viewButton
                actionButtons
                callback={(data, type, index) =>
                  updateSOSData(data, type, index)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        info={deleteInfo}
        show={deleteSOS}
        setShow={setDeleteSOS}
        handleDelete={handleDelete}
        arg={id}
      />
      {sosModal && (
        <AddSos
          setShow={setSOSModal}
          show={sosModal}
          viewModal={viewSOS}
          id={id}
        />
      )}
    </Management_container>
  );
}
