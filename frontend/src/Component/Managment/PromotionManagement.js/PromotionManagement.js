import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";

export default function PromotionManagement() {

    const navigate = useNavigate();


    function handleClick(){
        navigate("/addPromotion")    
    }
    return(
        <Management_container title={"Promotion Management"}>
        <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"Add New"} />
              </div>

              </div></div></div></div>
        </Management_container>
    )
};
