import { useEffect, useRef, useState } from "react";
import { MapContainer, useMap } from "react-leaflet";
import { Button, Modal } from "react-bootstrap";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const RecenterAutomatically = ({position}) => {
    const map = useMap();
     useEffect(() => {
       map.setView(position,13);
     }, [position]);
     return null;
   }




export default function LocationService({show,setIsOpen}) {
    const [position,setPosition] = useState({lat:0,lng:0})
    const [address,setAddress] = useState()
    const mapRef = useRef();
    const [gMapLoaded,setGMapLoaded] = useState(false)
    useEffect(() => {
      getDeviceLocation()
      window.initMap = () => setGMapLoaded(true)
      const gmapScriptEl = document.createElement(`script`)
      gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k&libraries=places&callback=initMap`
      document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

      return(document.body.removeChild(gmapScriptEl))
      }, []);



      function getDeviceLocation(){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setPosition({lat:latitude, lng:longitude});
              },
              (error) => {
                console.error("Error getting user location:", error);
              }
            );
          } else {
            console.error("Geolocation is not available in this browser.");
          }
      }

    

      const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    setAddress(selectedAddress);
    setPosition({ lat: latLng.lat, lng: latLng.lng });
  };

    return(

        <Modal
        show={show}
        onHide={()=>setIsOpen(false)}
        size="sm">
       { gMapLoaded && <PlacesAutocomplete 
        onChange={setAddress}
        onSelect={handleSelect}
        value={address}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Search Places...' })} />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion, index) => {
                  const { placeId, description } = suggestion;
                  return (
                    <div key={placeId} {...getSuggestionItemProps({ suggestion })}>
                      {description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        
        </PlacesAutocomplete>}
        <MapContainer
        zoom={0}
        center={position}
        style={{height:"400px", width:"400px"}}
        scrollWheelZoom={false} 
        ref={mapRef}
        >

        
        <RecenterAutomatically position={position} />
        <ReactLeafletGoogleLayer
        googleMapsLoaderConf={{
          KEY: "AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
        }}
        type={"roadmap"}
      />
        </MapContainer>
        
        
        </Modal>
        
    )
};


