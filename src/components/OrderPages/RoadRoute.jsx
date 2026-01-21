import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const MIN_ROUTE_UPDATE_DISTANCE = 5; // meters

const RoadRoute = ({ start, end, lastStart, onRouteFound }) => {
    const map = useMap();
    const routingRef = useRef(null);
    const onRouteFoundRef = useRef(onRouteFound);

    // Keep callback fresh
    useEffect(() => {
        onRouteFoundRef.current = onRouteFound;
    }, [onRouteFound]);

    // Initialize Routing Control (ONCE)
    useEffect(() => {
        if (!map) return;

        const routing = L.Routing.control({
            waypoints: [], // Helper will set these
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            createMarker: () => null,
            lineOptions: {
                styles: [{ color: "#2563eb", weight: 5, opacity: 0.75 }],
            },
            router: L.Routing.osrmv1({
                serviceUrl: "https://router.project-osrm.org/route/v1",
            }),
        });

        routing.on("routesfound", (e) => {
            onRouteFoundRef.current?.(e.routes[0].summary);
        });

        routing.addTo(map);

        // Hide default container
        const container = routing.getContainer();
        if (container) container.style.display = "none";

        routingRef.current = routing;

        // Cleanup on unmount
        return () => {
            if (map && routing) {
                try {
                    map.removeControl(routing);
                } catch (e) {
                    console.warn(e);
                }
            }
            routingRef.current = null;
        };
    }, [map]);

    // Update Waypoints (ON CHANGE)
    useEffect(() => {
        if (!start || !end || !routingRef.current) return;

        // Prevent excessive routing calls
        if (
            lastStart &&
            distanceInMeters(start, lastStart) < MIN_ROUTE_UPDATE_DISTANCE
        ) {
            return;
        }

        // Update existing control instead of recreating
        routingRef.current.setWaypoints([
            L.latLng(start[0], start[1]),
            L.latLng(end[0], end[1])
        ]);

    }, [start, end, lastStart]);

    return null;
};


// Helper to calculate distance in meters
function distanceInMeters(latlng1, latlng2) {
    const R = 6371e3; // metres
    const φ1 = (latlng1[0] * Math.PI) / 180; // φ, λ in radians
    const φ2 = (latlng2[0] * Math.PI) / 180;
    const Δφ = ((latlng2[0] - latlng1[0]) * Math.PI) / 180;
    const Δλ = ((latlng2[1] - latlng1[1]) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export default RoadRoute;
