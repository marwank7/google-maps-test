import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapConfig from "../configFiles/mapConfig.json";
import markersConfig from "../configFiles/markersConfig.json";
import "./googleMaps.css";

const center = mapConfig.center;
const zoomLevel = mapConfig.zoom_level;

const markers = markersConfig.markers;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MyComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="map-wrapper">
      <GoogleMap
        className={"map"}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              label={marker.tags}
              position={marker.location}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
              }}
            />
          );
        })}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MyComponent);
