import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

import NeshanMap, { NeshanMapRef, OlMap, Ol, Overlay, Feature } from "@neshan-maps-platform/react-openlayers";
import { Box, CircularProgress } from "@mui/material";

function App() {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const [ol, setOl] = useState();
    const [olMap, setOlMap] = useState();
    const [userLocation, setUserLocation] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const onInit = (ol, map) => {
        setOl(ol);
        setOlMap(map);

        // Get the user's location
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });

            // Center the map on the user's location
            map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));

            // Add a marker to the user's location
            const userLocationMarker = new Feature({
                geometry: new Ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
            });

            userLocationMarker.setStyle(
                new Ol.style.Style({
                    image: new Ol.style.Circle({
                        radius: 8,
                        fill: new Ol.style.Fill({ color: "blue" }),
                        stroke: new Ol.style.Stroke({ color: "white", width: 2 }),
                    }),
                })
            );

            markerRef.current = new Overlay({
                element: userLocationMarker,
                positioning: "center-center",
            });

            map.addOverlay(markerRef.current);

            setIsLoading(false);
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (mapRef.current?.map) {
                mapRef.current?.map.setMapType("standard-night");
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box mt={2} position="relative">
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CircularProgress />
                </div>
            )}
            <NeshanMap
                ref={mapRef}
                center={userLocation}
                mapKey="web.5d4589bb590945249a496c878c8d3f56"
                defaultType="neshan"
                onInit={onInit}
                zoom={13}
                style={{ width: "100%", height: "550px" }}
            ></NeshanMap>
        </Box>
    );
}

export default App;
