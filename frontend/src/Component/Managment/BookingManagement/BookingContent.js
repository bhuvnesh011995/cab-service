import Content from "./Content";

export default function BookingContent({booking}) {
    return(
        <>
        <div>
        <h5> Booking Info</h5>
        <div className="d-flex justify-content-around flex-wrap">
        <Content title="Country" subtitle={booking?.bookingInfo?.country?.name} />
        <Content title="State" subtitle={booking?.bookingInfo?.state?.name} />
        <Content title="City" subtitle={booking?.bookingInfo?.city?.name} />
        <Content title="Pickup Address" subtitle={booking?.bookingInfo?.pickUp?.address} />
        <Content title="Drop Address" subtitle={booking?.bookingInfo?.drop?.address} />
        </div>
        </div>
        </>
    )
};
