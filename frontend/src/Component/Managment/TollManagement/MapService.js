import { GoogleMap, InfoWindow, useJsApiLoader,Marker } from '@react-google-maps/api';
import { useRef, useState } from 'react';

const defaultCenter = {
    lat:20.5937,
    lng:78.9629
}

const containerStyle = {
    width: '100%',
    height: '700px',
}

const libraries = ['places', 'drawing']

export default function MapService({data}) {
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [center,setCenter] = useState(defaultCenter)
        const mapRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k',
        nonce: "nonce-691d29db-ab00-4bf6-94fa-168373d2fb7e",
        libraries

    });

    const onLoadMap = (map) => {
        mapRef.current = map;
    }


    return (
        isLoaded
            ?
            <div className='map-container' style={{ position: 'relative' }}>
                <GoogleMap
                    zoom={5}
                    center={center}
                    onLoad={onLoadMap}
                    mapContainerStyle={containerStyle}
                    onTilesLoaded={() => setCenter(center)}
                >
                {data.map(marker => {
                    console.log(marker)
                    return (
                    <Marker
                      key={marker.location._id}
                      position={{lat:parseFloat(marker.location.lat),lng:parseFloat(marker.location.lng)}}
                      title={marker.title}
                      onMouseOver={() => setHoveredMarker(marker)}
                      onMouseOut={() => setHoveredMarker(null)}
                      onClick={() => setSelectedMarker(marker)}
                    />
                  )})}
          
                  {hoveredMarker && (
                    <div className="marker-tooltip">
                      {hoveredMarker.title}
                    </div>
                  )}

                  {selectedMarker && (
                    <InfoWindow
                      position={{lat:parseFloat(selectedMarker.location.lat),lng:parseFloat(selectedMarker.location.lng)}}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div>
                        <h3>{selectedMarker.title}</h3>
                        <p><b>Status :</b>{selectedMarker.status}</p>
                        <p><b>Toll Charge :</b> {selectedMarker.amount}</p>
                      </div>
                    </InfoWindow>
                  )}
                    
                </GoogleMap>
            </div>
            :
            null
    );
};
