import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { ChakraProvider, theme } from '@chakra-ui/react'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import Management_container from '../../Common/Management_container';
import BookingInputs from './BookingInputs';

const initialCenter = { lat: 0, lng: 0 }
const bookingState ={
  driverId:"",
  riderId:"",
  baseFareId:"",
  bookingInfo:"",
  runMode:"",
  bookingType:"",
  rideInfo:"",
  nightCharge:"",
  peakCharge:"",
  fareFrom:"",
  travelTime:"",
  travelDistance:"",
  extraTravelTime:"",
  extraTravelDistance:"",
  KMFare:"",
  baseFare:"",
  tripFare:"",
  promocodeDiscount:"",
  tollFare:"",
  taxFare:"",
  walletMoney:'',
  payableFare:"",
  finalPayableFare:"",
  remainingPayableFare:"",
  driverTripCommission:"",
  adminTripCommission:"",
  driverCommission:"",
  adminCommission:"",
  driverInHand:"",
  adminInHand:"",
  payoutAmount:"",
  payoutType:"",
  success:"",
  status:"",
  vehicleId:""
}

const libraries = ['places']
export default function BookingService({show,setIsOpen}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
    libraries
  })
  const [booking,setBooking] = useState(bookingState);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [center,setCenter] = useState(initialCenter);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()


  function getCurrentLocation(){
    if ("geolocation" in navigator) {
             navigator.geolocation.getCurrentPosition(
               (position) => {
                 const { latitude, longitude } = position.coords;
                 setCenter({lat:latitude, lng:longitude});
               },
               (error) => {
                 console.error("Error getting user location:", error);
               }
             );
           } else {
             console.error("Geolocation is not available in this browser.");
           }
  }

 

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <ChakraProvider theme={theme}>
    <Management_container title={"New Booking"}>
    <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
        {isLoaded &&
          <div style={{height:"40vh", width:"100%"}}>
          <Box position='relative' left={0} top={0} h="100%" w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={0}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
      position="absolute"
      top="5px"
      left="5px"
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        width="20%"
      >
      <div className='d-flex flex-column justify-content-around mb-2'>
      <Box spacing={1} flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box spacing={1} flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Destination' ref={destiantionRef} />
            </Autocomplete>
          </Box>
            <Button spacing={1} colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <Button spacing={1} colorScheme="red" onClick={clearRoute}>Clear</Button>
      </div>
        <HStack spacing={2} mt={2} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
        </HStack>
        
      </Box>
      <div style={{position:"relative",left:"92%",top:"-55px"}}>
      <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              getCurrentLocation()
              map.panTo(center)
              map.setZoom(15)
            }}
          /></div>
          </div>
        }
        <div>
        <BookingInputs booking={booking} setBooking={setBooking} />
        
        </div></div></div></div></div>
    </Management_container>
    </ChakraProvider>
    
  )
}






















// import { useEffect, useRef, useState } from "react";
// import { MapContainer, useMap } from "react-leaflet";
// import { Button, Modal } from "react-bootstrap";
// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng,
//   } from 'react-places-autocomplete';

// const RecenterAutomatically = ({position}) => {
//     const map = useMap();
//      useEffect(() => {
//        map.setView(position,13);
//      }, [position]);
//      return null;
//    }




// export default function LocationService({show,setIsOpen}) {
//     const [position,setPosition] = useState({lat:0,lng:0})
//     const [address,setAddress] = useState()
//     const mapRef = useRef();
//     const [gMapLoaded,setGMapLoaded] = useState(false)
//     useEffect(() => {
//       getDeviceLocation()
//       window.initMap = () => setGMapLoaded(true)
//       const gmapScriptEl = document.createElement(`script`)
//       gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k&libraries=places&callback=initMap`
//       document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

//       return(document.body.removeChild(gmapScriptEl))
//       }, []);



//       function getDeviceLocation(){
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setPosition({lat:latitude, lng:longitude});
//               },
//               (error) => {
//                 console.error("Error getting user location:", error);
//               }
//             );
//           } else {
//             console.error("Geolocation is not available in this browser.");
//           }
//       }

    

//       const handleSelect = async (selectedAddress) => {
//     const results = await geocodeByAddress(selectedAddress);
//     const latLng = await getLatLng(results[0]);
//     setAddress(selectedAddress);
//     setPosition({ lat: latLng.lat, lng: latLng.lng });
//   };

//     return(

//         
//        { gMapLoaded && <PlacesAutocomplete 
//         onChange={setAddress}
//         onSelect={handleSelect}
//         value={address}
//         >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//             <div>
//               <input {...getInputProps({ placeholder: 'Search Places...' })} />
//               <div>
//                 {loading ? <div>Loading...</div> : null}
//                 {suggestions.map((suggestion, index) => {
//                   const { placeId, description } = suggestion;
//                   return (
//                     <div key={placeId} {...getSuggestionItemProps({ suggestion })}>
//                       {description}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
        
//         </PlacesAutocomplete>}
//         <MapContainer
//         zoom={0}
//         center={position}
//         style={{height:"400px", width:"400px"}}
//         scrollWheelZoom={false} 
//         ref={mapRef}
//         >

        
//         <RecenterAutomatically position={position} />
//         <ReactLeafletGoogleLayer
//         googleMapsLoaderConf={{
//           KEY: "AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
//         }}
//         type={"roadmap"}
//       />
//         </MapContainer>
        
        
//         </Modal>
        
//     )
// };


