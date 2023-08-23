import Content from "./Content";

export default function BookingContent({booking}) {
    console.log(booking)
    return(
        <>
        <div>
            <h3 className="mb-3 font-weight-bold"> Booking Info</h3>
            <div className="row">
                <Content title="Pickup Address" subtitle={booking?.bookingInfo?.pickUp?.address} />
                <Content title="Drop Address" subtitle={booking?.bookingInfo?.drop?.address} />
                <Content title="From Lat Long" subtitle={booking?.bookingInfo?.pickUp?.location.latitude+","+booking?.bookingInfo?.pickUp?.location.longitude} />
                <Content title="To Lat Long" subtitle={booking?.bookingInfo?.drop?.location.latitude+","+booking?.bookingInfo?.pickUp?.location.longitude} />
                <Content title="Booking Date and Time" subtitle={booking?.bookingInfo?.bookingDate.slice(0,19)} />
                <Content title="Booking Type" subtitle={booking?.bookingType} />
                <Content title="Booking Running Type" subtitle={booking?.runMode?.name} />
                <Content title="Status" subtitle={booking?.status} />
                <Content title="Country" subtitle={booking?.bookingInfo?.country?.name} />
                <Content title="State" subtitle={booking?.bookingInfo?.state?.name} />
                <Content title="City" subtitle={booking?.bookingInfo?.city?.name} />   
            </div>
            
            <div className="row">
            <div className="col-md-6"><h3 className="mb-3 font-weight-bold">Rider Info</h3>
            <div className="row">
            <Content title={"Name"} subtitle={booking?.rider?.firstName + " " + booking?.rider?.lastName} />
            <Content title={"mobile"} subtitle={booking?.rider?.mobile} />
            <Content title={"email"} subtitle={booking?.rider?.email} />
            </div>
            </div>
            <div className="col-md-6"><h3 className="mb-3 font-weight-bold">Driver Info</h3>
            <div className="row">
                <Content title={"Name"} subtitle={booking?.driver?.firstName + " " + booking?.driver?.lastName} />
                <Content title={"mobile"} subtitle={booking?.driver?.mobile} />
                <Content title={"email"} subtitle={booking?.driver?.email} />
            </div>
            </div>
            </div>

            <div className="row">
            <div className="col-md-6"><h3 className="mb-3 font-weight-bold">Start Info</h3>
            <div className="row">
                <Content title={"Lat Long"} subtitle={booking?.rideInfo?.start?.location?.latitude+","+booking?.rideInfo?.start?.location?.longitude} />
                <Content title={"Date and Time"} subtitle={booking?.rideInfo?.start?.date.slice(0,19)} />
            </div>
            </div>
            <div className="col-md-6"><h3 className="mb-3 font-weight-bold">End Info</h3>
            <div className="row">
            <Content title={"Lat Long"} subtitle={booking?.rideInfo?.end?.location?.latitude+","+booking?.rideInfo?.end?.location?.longitude} />
                <Content title={"Date and Time"} subtitle={booking?.rideInfo?.end?.date.slice(0,19)} />
            </div>
            </div>
            </div>

            <h3 className="mb-3 font-weight-bold"> Texi Info</h3>
            <div className="row">
            <Content title={"Vehicle Type"} subtitle={booking?.vehicle?.vehicleType?.name}></Content>
            <Content title={"Make"} subtitle={booking?.vehicle?.make?.name}></Content>
            <Content title={"Model"} subtitle={booking?.vehicle?.model}></Content>
            <Content title={"Color"} subtitle={booking?.vehicle?.color}></Content>
            <Content title={"Plate No"} subtitle={booking?.vehicle?.plateNo}></Content>
            </div>


            <h3 className="mb-3 font-weight-bold"> Applicable Charges</h3>
            <div className="row">
            <Content title={"Base Fare"} subtitle={booking?.applicableCharges?.baseFare?.baseFare || "NA"} />
            <Content title={"Minimum Charge"} subtitle={booking?.applicableCharges?.baseFare?.minCharge || "NA"} />
            <Content title={"Cancellation Charge"} subtitle={booking?.applicableCharges?.baseFare?.cancelCharge} />
            <Content title={"Admin commission Type"} subtitle={booking?.applicableCharges?.baseFare?.adminCommissionType || "NA"} />
            <Content title={"Admin commission"} subtitle={booking?.applicableCharges?.baseFare?.adminCommission || "NA"} />
            <Content title={"Night Charge"} subtitle={booking?.applicableCharges?.nightCharge.$numberDecimal} />
            <Content title={"Peak Charge"} subtitle={booking?.applicableCharges?.peakCharge.$numberDecimal} />
            <Content title={"Per KM Charge"} subtitle={booking?.applicableCharges?.baseFare?.perKMCharge[0].fare || "NA"} />
            <Content title={"Booking Fee"} subtitle={"NA"} />
            <Content title={"Per Min Charge"} subtitle={booking?.applicableCharges?.baseFare?.perMinCharge} />
            <Content title={"Payment Method"} subtitle={"Cash or wallet"} />
            </div>


            <h3 className="mb-3 font-weight-bold">Package Info</h3>
            <div className="row">
                <Content title={"Package Name"} subtitle={"NA"}/>
                <Content title={"Max Duration"} subtitle={"NA"}/>
                <Content title={"Max Distance(KM)"} subtitle={"NA"}/>
            </div>


            <h3 className="mb-3 font-weight-bold">Applied Charges</h3>
            <div className="row">
                <Content title={"Travel Time"} subtitle={(booking?.bookingSummery?.travelTime/60000).toFixed(2) +" min"}/>
                <Content title={"Travel Distance"} subtitle={booking?.bookingSummery?.travelDistance.$numberDecimal + " KM"}/>
                <Content title={"Extra travel Time"} subtitle={(booking?.bookingSummery?.extraTravelTime/60000).toFixed(2) +" min"}/>
                <Content title={"Extra travel Distance"} subtitle={booking?.bookingSummery?.extraTravelDistance.$numberDecimal +" KM"}/>
                <Content title={"Base Fare"} subtitle={booking?.bookingSummery?.baseFare.$numberDecimal || "NA"}/>
                <Content title={"KM Fare"} subtitle={booking?.bookingSummery?.KMFare.$numberDecimal}/>
                <Content title={"Time Fare"} subtitle={booking?.bookingSummery?.timeFare.$numberDecimal}/>
                <Content title={"Night Fare"} subtitle={booking?.bookingSummery?.nightFare.$numberDecimal}/>
                <Content title={"Peak Fare"} subtitle={booking?.bookingSummery?.peakFare.$numberDecimal}/>
                <Content title={"Pack Fare"} subtitle={"NA"}/>
                <Content title={"trip Fare"} subtitle={booking?.bookingSummery?.tripFare.$numberDecimal}/>
                <Content title={"Toll Fare"} subtitle={booking?.bookingSummery?.tollFare.$numberDecimal}/>
                <Content title={"Tax Fare"} subtitle={booking?.bookingSummery?.taxFare.$numberDecimal}/>
                <Content title={"Free Ride"} subtitle={"NA"}/>
                <Content title={"Promocode Discount"} subtitle={booking?.bookingSummery?.promocodeDiscount}/>
                <Content title={"Wallet Money"} subtitle={booking?.bookingSummery?.walletMoney.$numberDecimal}/>
                <Content title={"Payble fare"} subtitle={booking?.bookingSummery?.payableFare.$numberDecimal}/>
                <Content title={"Final Payble fare"} subtitle={booking?.bookingSummery?.finalPayableFare.$numberDecimal}/>
                <Content title={"Remaining payble Fare"} subtitle={booking?.bookingSummery?.remainingPayableFare.$numberDecimal}/>
            </div>



            <h3 className="mb-3 font-weight-bold">Distribution Info</h3>
            <div className="row">
                <Content title={"Driver trip commission"} subtitle={booking?.distributionInfo?.driverTripCommission.$numberDecimal}/>
                <Content title={"Admin Trip Commission"} subtitle={booking?.distributionInfo?.adminTripCommission.$numberDecimal}/>
                <Content title={"Driver Commission"} subtitle={booking?.distributionInfo?.driverCommission.$numberDecimal}/>
                <Content title={"Admin Commission"} subtitle={booking?.distributionInfo?.adminCommission.$numberDecimal}/>
                <Content title={"Driver Hand"} subtitle={booking?.distributionInfo?.driverInHand.$numberDecimal}/>
                <Content title={"Admin Hand"} subtitle={booking?.distributionInfo?.adminInHand.$numberDecimal}/>
                <Content title={"Payout amount"} subtitle={booking?.distributionInfo?.payoutAmount.$numberDecimal}/>
                <Content title={"Payout Type"} subtitle={booking?.distributionInfo?.payoutType}/>
            </div>
        </div>
        </>
    )
};
