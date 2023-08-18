import React, { useEffect, useRef, useState } from 'react';
import { DrawingManager, GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api';
import * as AiIcons from "react-icons/ai"


const MapService = () => {

    const mapRef = useRef();
    const polygonRefs = useRef([]);
    const activePolygonIndex = useRef();
    const autocompleteRef = useRef();
    const drawingManagerRef = useRef();
    // useEffect(() => {
    //    // Get the user's location using Geolocation API
    //   if ("geolocation" in navigator) {
    //        navigator.geolocation.getCurrentPosition(
    //          (position) => {
    //            const { latitude, longitude } = position.coords;
    //            setCenter({lat:latitude, lng:longitude});
    //          },
    //          (error) => {
    //            console.error("Error getting user location:", error);
    //          }
    //        );
    //      } else {
    //        console.error("Geolocation is not available in this browser.");
    //      }
    //    }, []);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k',
        libraries : ['places', 'drawing'],
        nonce: "nonce-691d29db-ab00-4bf6-94fa-168373d2fb7e",
    });

    const [polygons, setPolygons] = useState([]);

    const defaultCenter = {
        lat: 28.626137,
        lng: 79.821603,
    }
    const [center, setCenter] = useState(defaultCenter);

    const containerStyle = {
        width: '100%',
        height: '400px',
    }


    const deleteIconStyle = {
        cursor: 'pointer',
        marginTop: '5px', 
        backgroundColor: '#fff',
        position: 'absolute',
        top: "0px",
        left: "53%",
        zIndex: 99999
    }

    const polygonOptions = {
        fillOpacity: 0.3,
        fillColor: '#ff0000',
        strokeColor: '#ff0000',
        strokeWeight: 2,
        draggable: true,
        editable: true
    }

    const drawingManagerOptions = {
        polygonOptions: polygonOptions,
        drawingControl: true,
        drawingControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_CENTER,
            drawingModes: [
                window.google?.maps?.drawing?.OverlayType?.POLYGON
            ]
        }
    }

    const onLoadMap = (map) => {
        mapRef.current = map;
    }

    const onLoadPolygon = (polygon, index) => {
        polygonRefs.current[index] = polygon;
    }

    const onClickPolygon = (index) => {
        activePolygonIndex.current = index; 
    }

   
    const onLoadDrawingManager = drawingManager => {
        drawingManagerRef.current = drawingManager;
    }

    const onOverlayComplete = ($overlayEvent) => {
        drawingManagerRef.current.setDrawingMode(null);
        if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
            const newPolygon = $overlayEvent.overlay.getPath()
                .getArray()
                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))

            // start and end point should be same for valid geojson
            const startPoint = newPolygon[0];
            newPolygon.push(startPoint);
            $overlayEvent.overlay?.setMap(null);
            setPolygons([...polygons, newPolygon]);
        }
    }

    const onDeleteDrawing = () => {  
        const filtered = polygons.filter((polygon, index) => index !== activePolygonIndex.current) 
        setPolygons(filtered)
    }

    const onEditPolygon = (index) => {
        const polygonRef = polygonRefs.current[index];
        if (polygonRef) {
            const coordinates = polygonRef.getPath()
                .getArray()
                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));

            const allPolygons = [...polygons];
            allPolygons[index] = coordinates;
            setPolygons(allPolygons)
        }
    }

    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                {
                    drawingManagerRef.current
                    &&
                    <div
                        onClick={onDeleteDrawing}
                        title='Delete shape'
                        style={deleteIconStyle}
                        >
                      <AiIcons.AiFillDelete size={"1.21rem"}/>
                    </div>
                }
                <GoogleMap
                    zoom={15}
                    center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                    onTilesLoaded={() => setCenter(null)}
                >
                    <DrawingManager
                        onLoad={onLoadDrawingManager}
                        onOverlayComplete={onOverlayComplete}
                        options={drawingManagerOptions}
                    />
                    {
                        polygons.map((iterator, index) => (
                            <Polygon
                                key={index}
                                onLoad={(event) => onLoadPolygon(event, index)}
                                onMouseDown={() => onClickPolygon(index)}
                                onMouseUp={() => onEditPolygon(index)}
                                onDragEnd={() => onEditPolygon(index)}
                                options={polygonOptions}
                                paths={iterator}
                                draggable
                                editable
                            />
                        ))
                    }
                    
                </GoogleMap>
            </div>
            :
            null
    );
}

export default MapService; 

// import { TileLayer, FeatureGroup, MapContainer, useMap, ZoomControl } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import { useEffect, useRef, useState } from "react";


// const RecenterAutomatically = ({center}) => {
//   const map = useMap();
//    useEffect(() => {
//      map.setView(center,15);
//    }, [center]);
//    return null;
//  }


// export default function MapService({setMapLayers,mapLayers}) {
//   let mapRef = useRef();
//   const [center, setCenter] = useState({ lat: 26.7679251, lng: 50.8238913 });
 
//   useEffect(() => {
//     // Get the user's location using Geolocation API
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log(latitude," ",longitude)
//           setCenter(prePosition=>({...prePosition,lat:latitude, lng:longitude}));
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not available in this browser.");
//     }
//   }, []);
  

//   const _onCreate = (e) => {
//     console.log(e);

//     const { layerType, layer } = e;
//     if (layerType === "polygon") {
//       const { _leaflet_id } = layer;

//       setMapLayers((layers) => [
//         ...layers,
//         { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
//       ]);
//     }
//   };

//   const _onEdited = (e) => {
//     console.log(e);
//     const {
//       layers: { _layers },
//     } = e;

//     Object.values(_layers).map(({ _leaflet_id, editing }) => {
//       setMapLayers((layers) =>
//         layers.map((l) =>
//           l.id === _leaflet_id
//             ? { ...l, latlngs: { ...editing.latlngs[0] } }
//             : l
//         )
//       );
//     });
//   };

//   const _onDeleted = (e) => {
//     console.log(e);
//     const {
//       layers: { _layers },
//     } = e;

//     Object.values(_layers).map(({ _leaflet_id }) => {
//       setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
//     });
//   };
  
//   return (
//     <div >
//     <MapContainer center={center} zoomControl={false} zoom={12} style={{width:"100%",height:"400px"}} scrollWheelZoom={false} ref={mapRef}>
//     <ZoomControl position="bottomleft" />
//       <FeatureGroup>
//         <EditControl
//           position="topright"
//           onCreated={_onCreate}
//           onEdited={_onEdited}
//           onDeleted={_onDeleted}
//           draw={{
//             rectangle: false,
//             polyline: false,
//             circle: false,
//             circlemarker: false,
//           }}
//         />
//       </FeatureGroup>
      
//       <RecenterAutomatically center={center} />

//       <ReactLeafletGoogleLayer
//         googleMapsLoaderConf={{
//           KEY: "AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
//         }}
//         type={"roadmap"}
//       />
//     </MapContainer>
//     </div>
    
//   );
// }



