import Management_container from "../../Common/Management_container";
import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import BASE_URL from "../../../config/config";
import Selection_Input from "../../Common/Inputs/Selection_input";
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import DriverDetails from "./DriverDetails";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { driverTableHeaders } from "../../../constants/table.contants";
import AddDriver from "./AddDriver";

const initialFilter = {
  name: "",
  email: "",
  mobile: "",
  status: "",
};

export default function DriverManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [driver, setDriver] = useState(null);

  const [id, setId] = useState(null);
  const [viewDriver, setViewDriver] = useState(false);
  const [deleteDriver, setDeleteDriver] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + "/drivers/filter", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.drivers.map((ele, i) => {
            let obj = {
              index: i + 1,
              firstName: ele.firstName,
              lastName: ele.lastName,
              mobile: ele.mobile,
              email: ele.email,
              status: ele.status,
              wallet: ele?.wallet?.balance,
              verified: ele.verified ? (
                <tiIcons.TiTick />
              ) : (
                <rsIcons.RxCross2 />
              ),
              createdAt: ele.createdAt,
              id: ele._id,
              country: ele.address?.country?.name,
              state: ele.address?.state?.name,
              city: ele.address?.city?.name,
              pincode: ele.address.pincode,
              place: ele.address?.place,
              createdBy: ele.createdBy?.name,
              updatedBy: ele.updatedBy?.name,
              updatedAt: ele.updatedAt,
              DOB: ele.DOB,
            };
            if (
              !ele.aadhar?.verified ||
              !ele.license?.verified ||
              !ele.pan?.verified
            )
              obj.documentStatus = <rsIcons.RxCross2 />;
            else obj.documentStatus = <tiIcons.TiTick />;

            arr.push(obj);
          });
          setList(arr);
        }
      });
  }, []);

  function handleSubmit() {
    fetch(
      BASE_URL +
        "/drivers/filter?name=" +
        filter.name +
        "&email=" +
        filter.email +
        "&mobile=" +
        filter.mobile +
        "&status=" +
        filter.status,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.drivers.map((ele, i) => {
            let obj = {
              index: i + 1,
              firstName: ele.firstName,
              lastName: ele.lastName,
              mobile: ele.mobile,
              email: ele.email,
              status: ele.status,
              wallet: ele?.wallet?.balance,
              verified: ele.verified ? (
                <tiIcons.TiTick />
              ) : (
                <rsIcons.RxCross2 />
              ),
              createdAt: ele.createdAt,
              id: ele._id,
            };
            if (
              !ele.aadhar?.verified ||
              !ele.license?.verified ||
              !ele.pan?.verified
            )
              obj.documentStatus = <rsIcons.RxCross2 />;
            else obj.documentStatus = <tiIcons.TiTick />;

            arr.push(obj);
          });
          setList(arr);
        }
      });
  }

  function reset() {}

  function handleLicExp() {
    fetch(BASE_URL + "/drivers/filter/?licExp=true", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.drivers.map((ele, i) => {
            let obj = {
              index: i + 1,
              firstName: ele.firstName,
              lastName: ele.lastName,
              mobile: ele.mobile,
              email: ele.email,
              status: ele.status,
              wallet: ele.wallet.balance,
              verified: ele.verified ? (
                <tiIcons.TiTick />
              ) : (
                <rsIcons.RxCross2 />
              ),
              createdAt: ele.createdAt,
              id: ele._id,
            };
            if (
              !ele.aadhar?.verified ||
              !ele.license?.verified ||
              !ele.pan?.verified
            )
              obj.documentStatus = <rsIcons.RxCross2 />;
            else obj.documentStatus = <tiIcons.TiTick />;

            arr.push(obj);
          });
          setList(arr);
        }
      });
  }

  function handleDocPen() {
    fetch(BASE_URL + "/drivers/filter/?docPen=true", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.drivers.map((ele, i) => {
            let obj = {
              index: i + 1,
              firstName: ele.firstName,
              lastName: ele.lastName,
              mobile: ele.mobile,
              email: ele.email,
              status: ele.status,
              wallet: ele.wallet.balance,
              verified: ele.verified ? (
                <tiIcons.TiTick />
              ) : (
                <rsIcons.RxCross2 />
              ),
              createdAt: ele.createdAt,
              id: ele._id,
            };
            if (
              !ele.aadhar?.verified ||
              !ele.license?.verified ||
              !ele.pan?.verified
            )
              obj.documentStatus = <rsIcons.RxCross2 />;
            else obj.documentStatus = <tiIcons.TiTick />;

            arr.push(obj);
          });
          setList(arr);
        }
      });
  }

  function handleApproved() {
    fetch(BASE_URL + "/drivers/filter/?approved=true", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.drivers.map((ele, i) => {
            let obj = {
              index: i + 1,
              firstName: ele.firstName,
              lastName: ele.lastName,
              mobile: ele.mobile,
              email: ele.email,
              status: ele.status,
              wallet: ele.wallet.balance,
              verified: ele.verified ? (
                <tiIcons.TiTick />
              ) : (
                <rsIcons.RxCross2 />
              ),
              createdAt: ele.createdAt,
              id: ele._id,
            };
            if (
              !ele.aadhar?.verified ||
              !ele.license?.verified ||
              !ele.pan?.verified
            )
              obj.documentStatus = <rsIcons.RxCross2 />;
            else obj.documentStatus = <tiIcons.TiTick />;

            arr.push(obj);
          });
          setList(arr);
        }
      });
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
                  onClick={handleLicExp}
                  type='button'
                  className='btn m-2 btn-outline-primary waves-effect waves-light'
                >
                  License expired Driver
                </button>

                <button
                  onClick={handleDocPen}
                  type='button'
                  className='btn m-2 btn-outline-primary waves-effect waves-light'
                >
                  Doc Approval Pending Driver
                </button>

                <button
                  onClick={handleApproved}
                  type='button'
                  className='btn m-2 btn-outline-primary waves-effect waves-light'
                >
                  Approved Drivers
                </button>
              </div>
              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"name"}
                      lebel_text={"Name :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"email"}
                      lebel_text={"Email :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"mobile"}
                      lebel_text={"Mobile :"}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status : "}
                      setKey={"status"}
                    />

                    <div style={{ margin: "20px", marginTop: "50px" }}>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />

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
                data={list || []}
                tableHeaders={driverTableHeaders}
                actionButtons
                deleteButton
                editButton
                viewButton
                callback={(data, type, index) =>
                  updateDrivers(data, type, index)
                }
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
