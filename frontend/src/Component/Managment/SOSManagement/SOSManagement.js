import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { sosTableHeaders } from "../../../constants/table.contants";
import AddSos from "./AddSos";
import DeleteModal from "../../DeleteModel/DeleteModel";

const initialFilter = {
  userType: "",
};
export default function SOSManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [viewSOS, setViewSOS] = useState(false);
  const [deleteSOS, setDeleteSOS] = useState(false);
  const [sosModal, setSOSModal] = useState(false);

  useEffect(() => {
    // fetch(BASE_URL + "/sos/filter")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       let arr = data.sos.map((ele) => {
    //         return {
    //           bookingId: ele.booking._id,
    //           userType: ele.userType,
    //           firstName: ele.user.firstName,
    //           lastName: ele.user.lastName,
    //           lat: ele.location.lat,
    //           lng: ele.location.lng,
    //           createdAt: ele.createdAt,
    //         };
    //       });
    //       setList(arr);
    //     }
    //   });
  }, []);

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
    console.log("delete sos");
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
                    <SelectWithValue
                      input={filter}
                      setInput={setFilter}
                      setKey={"userType"}
                      label={"User Type"}
                      options={[
                        { value: "Rider", title: "Rider" },
                        { value: "Driver", title: "Driver" },
                      ]}
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
                data={[]}
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
