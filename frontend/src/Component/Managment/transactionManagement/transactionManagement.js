import Management_container from "../../Common/Management_container";
import { CommonDataTable } from "../../../Common/commonDataTable";
import { transactionTableHeaders } from "../../../constants/table.contants";

export default function TransactionManagement() {
  return (
    <Management_container title={"Transaction"}>
      <div className='row'>
        <div className='col-lg-13'>
          <div className='card'>
            <div className='card-body'>
              <CommonDataTable
                tableHeaders={transactionTableHeaders}
                data={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
