import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2Jlbm5ldHQiLCJhIjoiY2tyamVlcTdhMTRiYjJvbzR5eHJsdnpjbiJ9.x_spN1OL-wE2rG5I6iV-eg';

export default props => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-113.4816);
    const [lat, setLat] = useState(53.5294);
    const [zoom, setZoom] = useState(9);

    // Centre the map on Edmonton on load
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    // Update the coordinates and zoom on move
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return <div>
        <h1>Our React App</h1>
        <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
    </div>;
}
