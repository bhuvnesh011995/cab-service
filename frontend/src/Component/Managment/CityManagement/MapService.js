import { TileLayer, FeatureGroup, MapContainer, useMap, ZoomControl } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useRef, useState } from "react";


const RecenterAutomatically = ({center}) => {
  const map = useMap();
   useEffect(() => {
     map.setView(center,15);
   }, [center]);
   return null;
 }


export default function MapService({setMapLayers,mapLayers}) {
  let mapRef = useRef();
  const [center, setCenter] = useState({ lat: 26.7679251, lng: 50.8238913 });
 
  useEffect(() => {
    // Get the user's location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude," ",longitude)
          setCenter(prePosition=>({...prePosition,lat:latitude, lng:longitude}));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);
  

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };
  
  return (
    <div >
    <MapContainer center={center} zoomControl={false} zoom={12} style={{width:"100%",height:"400px"}} scrollWheelZoom={false} ref={mapRef}>
    <ZoomControl position="bottomleft" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
      
      <RecenterAutomatically center={center} />

      <ReactLeafletGoogleLayer
        googleMapsLoaderConf={{
          KEY: "AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
        }}
        type={"roadmap"}
      />
    </MapContainer>
    </div>
    
  );
}


