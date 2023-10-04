// pages/map.js

import { useEffect, useRef } from "react";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import { Box, Grow } from "@mui/material";

const CACHE_DURATION = 600000; // 10 minutes in milliseconds

function MapPage({ userLocation }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (mapRef.current?.map) {
                mapRef.current?.map.setMapType("standard-night");
                clearInterval(interval);
            }
        }, 1000);
    }, []);

    return (
        <Grow in timeout={2 * 600}>
            <Box mt={2}>
                <NeshanMap
                    center={userLocation}
                    mapKey="web.5d4589bb590945249a496c878c8d3f56"
                    defaultType="neshan"
                    zoom={13}
                ></NeshanMap>
            </Box>
        </Grow>
    );
}

export async function getServerSideProps({ req }) {
    const cacheKey = "mapCache"; // Unique key for your map cache
    let userLocation = null;

    try {
        // Check if map data is cached
        const cachedMapData = JSON.parse(req.session[cacheKey] || "{}");
        const currentTime = new Date().getTime();

        // If the cached data exists and is not expired, use it
        if (cachedMapData.timestamp && currentTime - cachedMapData.timestamp < CACHE_DURATION) {
            userLocation = cachedMapData.userLocation;
        } else {
            // Fetch the user's location on the server side
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            // Cache the user's location data
            req.session[cacheKey] = JSON.stringify({
                timestamp: currentTime,
                userLocation: { latitude, longitude },
            });

            userLocation = { latitude, longitude };
        }

        // Return the user's location data as props
        return {
            props: {
                userLocation,
            },
        };
    } catch (error) {
        console.error("Error fetching user location:", error);

        // Return null if there's an error
        return {
            props: {
                userLocation: null,
            },
        };
    }
}

export default MapPage;
