import React, { useEffect, useRef, useState } from "react";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
const libraries = ["places", "drawing"];
const defaultCenter = {
  lat: 27.626137,
  lng: 76.821603,
};
const polygonOptions = {
  fillOpacity: 0.3,
  fillColor: "#ff0000",
  strokeColor: "#ff0000",
  strokeWeight: 2,
  draggable: true,
  editable: true,
};

const drawingManagerOptions = {
  polygonOptions: polygonOptions,
  drawingControl: true,
  drawingControlOptions: {
    position: window.google?.maps?.ControlPosition?.TOP_CENTER,
    drawingModes: ["polygon"],
  },
};

export default function Map() {
  const [polygon, setPolygon] = useState(null);
  const [path, setPath] = useState([]);
  const mapRef = useRef();
  const drawingManagerRef = useRef();
  const onLoadMap = (map) => {
    mapRef.current = map;
  };

  const onLoadDrawingManager = (drawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const onLoadPolygon = function (shap) {
    setPolygon(shap);
  };
  const onOverlayComplete = (e) => {
    const drawingManager = drawingManagerRef.current;
    const paths = e.overlay
      .getPath()
      .getArray()
      .map((latlng) => ({ lat: latlng.lat(), lng: latlng.lng() }));

    setPath(paths);
    e.overlay.setMap(null);
    drawingManager.setDrawingMode(null);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAbiy9gnHWRMfzMFt_r1mz7Nc2YTwV7C2k",
    libraries,
    nonce: "nonce-691d29db-ab00-4bf6-94fa-168373d2fb7e",
  });

  const onEditPolygon = function () {
    let array = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));
    setPath(array);
  };
  return isLoaded ? (
    <GoogleMap
      zoom={8}
      center={defaultCenter}
      onLoad={onLoadMap}
      mapContainerStyle={{ height: "100%", width: "100%" }}
    >
      <DrawingManager
        onOverlayComplete={onOverlayComplete}
        onLoad={onLoadDrawingManager}
        options={drawingManagerOptions}
      />
      {path.length > 2 && (
        <Polygon
          onLoad={onLoadPolygon}
          onMouseUp={onEditPolygon}
          onDragEnd={onEditPolygon}
          options={polygonOptions}
          paths={path}
          draggable
          editable
        />
      )}
    </GoogleMap>
  ) : null;
}
