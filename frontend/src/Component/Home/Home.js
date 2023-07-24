import Title from "../Common/Title";
import Card from "../Common/Card";
import Graph1 from "../Common/Grapth1";
import Table from "../Common/Table";

export default function Home() {
  
  return (
      <div >
        <div >
          <div>
            <Title title={"DASHBOARD"} />
            <div>
              <div className="row">
                <Card content={"No of Driver"}/>
                <Card content={"Total Riders"}/>
                <Card content={"Total Numbers of ride"}/>
                <Card content={"Canceled Rode "}/>
                <Card content={"Vehicle Type"}/>
                <Card content={"Revenue"}/>
                <Card content={"Running Rides"}/>
                <Card content={"Completed ride"}/>
              </div>
              <Graph1/>
              <Table 
              tableHeading={"Contries"}
              heading={["Sr No", "Contries", "State", "No Of Drivers", "No Of Riders"]}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
