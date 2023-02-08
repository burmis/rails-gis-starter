import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2Jlbm5ldHQiLCJhIjoiY2tyamVlcTdhMTRiYjJvbzR5eHJsdnpjbiJ9.x_spN1OL-wE2rG5I6iV-eg';

export default props => {
    const mapContainer = useRef(null);
    const filter = useRef('');
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

    // Display the places GeoJSON on load
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        map.current.on('load', () => {
            map.current.addSource('places', {
                type: 'geojson',
                // Use a URL for the value for the `data` property.
                data: '/places.geojson',
            });

            addMapLayer('places-layer');
        });
    });

    function onFilter() {
        if (!map.current) return; // wait for map to initialize

        if (!filter.current.value) {
            map.current.setLayoutProperty('places-layer', 'visibility', 'visible');
            map.current.removeLayer('places-layer-filtered');
            return;
        }

        if (map.current.getLayer('places-layer-filtered')) {
            map.current.removeLayer('places-layer-filtered');
        }
        map.current.setLayoutProperty('places-layer', 'visibility', 'none');
        addMapLayer('places-layer-filtered', ['in', filter.current.value, ['string', ['get', 'name']]]);
    }

    function addMapLayer(id, filter) {
        const props = {
            'id': id,
            'type': 'heatmap',
            'source': 'places',
            'paint': {
                'heatmap-radius': 4,
                'heatmap-opacity': 0.7
            }
        };
        if (!!filter) {
            props.filter = filter;
        }

        map.current.addLayer(props);

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.current.on('click', id, (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const { name, description, rate } = e.features[0].properties;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<em>${name}</em><br/>${description} <div>rate ${rate}</div`)
                .addTo(map.current);
        });



        // Change the cursor to a pointer when the mouse is over the places layer.
        map.current.on('mouseenter', 'places-layer', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.current.on('mouseleave', 'places-layer', () => {
            map.current.getCanvas().style.cursor = '';
        });
    }


    return <div>
        <h1>Statvis</h1>
        <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <input id="map-filter-input" ref={filter} onKeyUp={onFilter} placeholder="Filter by name" />
        <div ref={mapContainer} className="map-container" />
    </div>;
}
