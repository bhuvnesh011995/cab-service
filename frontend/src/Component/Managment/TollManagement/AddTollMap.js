import { GoogleMap, InfoWindow, useJsApiLoader,Marker,Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"

const defaultCenter = {
    lat:20.5937,
    lng:78.9629
}

const containerStyle = {
    width: '100%',
    height: '700px',
}

const libraries = ['places', 'drawing']

export default function AddTollMap({marker,setMarker}) {
    const [map,setMap] = useState();
    const searchRef = useRef()
    const [mark,setMark] = useState(marker)
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k',
        nonce: "nonce-691d29db-ab00-4bf6-94fa-168373d2fb7e",
        libraries

    });

    const onLoadMap = (map) => {
        setMap(map)
    }

    function handleClick(e){
        console.log(e)
          const position = {
              lat:e.latLng.lat(),
              lng:e.latLng.lng()
          }
          setMark(position)
          setMarker(position)
          if(map && map.zoom<13){
            map.panTo(position)
            map.setZoom(13)
          }
     }


    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                <GoogleMap
                    zoom={5}
                    center={defaultCenter}
                    onLoad={onLoadMap}
                    onClick={handleClick}
                    mapContainerStyle={containerStyle}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                >
                
                <Autocomplete>
                     <Col sm="5">
                         <Form.Control _ref={searchRef} type="text" placeholder="Sarch..." />
                     </Col>
                 </Autocomplete>
                 {mark && (
                     <Marker
                       position={mark}
                       draggable={true}
                       onDragEnd={(e)=>setMarker({
                        lat:e.latLng.lat(),
                        lng:e.latLng.lng()
                    })}
                     />
                   )}
                </GoogleMap>
            </div>
            :
            null
    );
};












// import { GoogleMap, InfoWindow, useJsApiLoader,Marker,Autocomplete } from '@react-google-maps/api';
// import { useRef, useState } from 'react';
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form"

// const defaultCenter = {
//     lat:20.5937,
//     lng:78.9629
// }

// const containerStyle = {
//     width: '100%',
//     height: '700px',
// }

// const libraries = ['places', 'drawing']

// export default function AddTollMap() {
//     const [center,setCenter] = useState(defaultCenter)
//     const [marker,setMarker] = useState(null)
//         const  = useRef();
//         const searchRef = useRef()

//     const { isLoaded, loadError } = useJsApiLoader({
//         googleMapsApiKey: 'AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k',
//         nonce: "nonce-691d29db-ab00-4bf6-94fa-168373d2fb7e",
//         libraries

//     });

//     const onLoadMap = (map) => {
//         .current = map;
//     }

//     function handleClick(e){
//         const position = {
//             lat:e.latlng.lat(),
//             lng:e.latlng.lng()
//         }
//         setCenter(position)
//         setMarker(position)
//         if(){
//             .panTo(position)
//             .setZoom(14)
//         }
//     }


//     return (
//         isLoaded
//             ?
//             <div className='map-container' style={{ position: 'relative' }}>
//                 <GoogleMap
//                     zoom={8}
//                     center={null}
//                     onLoad={onLoadMap}
//                     onClick={handleClick}
//                     mapContainerStyle={containerStyle}
//                     onTilesLoaded={() => setCenter(center)}
//                 >
//                 <Autocomplete>
//                     <Col sm="5">
//                         <Form.Control _ref={searchRef} type="text" placeholder="Sarch..." />
//                     </Col>
//                 </Autocomplete>
//                 {marker && (
//                     <Marker
//                       position={marker}
//                       draggable={true} // Make the marker draggable
//                       onDragEnd={e=>setMarker({lat:e.latlng.lat(),lng:e.latlng.lng()})} // Handle marker drag end
//                     />
//                   )}
               
                    
//                 </GoogleMap>
//             </div>
//             :
//             null
//     );
// };
