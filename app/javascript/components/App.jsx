import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2Jlbm5ldHQiLCJhIjoiY2tyamVlcTdhMTRiYjJvbzR5eHJsdnpjbiJ9.x_spN1OL-wE2rG5I6iV-eg';

export default props => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null)
    const [lng, setLng] = useState(-113.4816);
    const [lat, setLat] = useState(53.5294);
    const [zoom, setZoom] = useState(9);
    const [features, setFeatures] = useState([])

    // Centre the map on Edmonton on load
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        
        map.on('load', () => {
            map.addSource('places', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
            
            map.addLayer({
                'id': 'places-layer',
                'type': 'circle',
                'source': 'places',
                'filter': ['has', 'point_count'],
                'paint': {
                    'circle-radius': 10,
                    'circle-stroke-width': 5,
                    'circle-color': 'blue',
                    'circle-stroke-color': 'white'
                }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'places',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
                 
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'places',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            // inspect a cluster on click
            map.on('click', 'places-layer', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['places-layer']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('places').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
            
            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.on('click', 'unclustered-point', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const { name, description, x: lon, y: lat } = e.features[0].properties;
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
                        <div class="place-popup">
                            <h4>Name: ${name}</h4>
                            <p>Description: ${description}</p>
                            <p>Lon: ${lon}</p>
                            <p>Lat: ${lat}</p>
                        </div>
                    `)
                    .addTo(map);
            });
 
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places-layer', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places-layer', () => {
                map.getCanvas().style.cursor = '';
            });

            setMap(map);
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    // Update the coordinates and zoom on move
    useEffect(() => {
        if (!map) return; // wait for map to initialize
        
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    }, [map]);

    // Add random shape 
    useEffect(() => {
        if (!map) return; // wait for map to initialize

        map.addSource('shape', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [-113.596464, 53.588253],
                            [-113.602192, 53.429771],
                            [-113.441843, 53.435710],
                            [-113.365323, 53.529295],
                            [-113.438101, 53.564635]
                        ]
                    ]
                }
            }
        });

        // Load an image to use as the pattern from an external URL.
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/colorado_flag.png',
            (err, image) => {
                // Throw an error if something goes wrong.
                if (err) throw err;
                
                // Add the image to the map style.
                map.addImage('pattern', image);
                
                // Create a new layer and style it using `fill-pattern`.
                map.addLayer({
                    'id': 'pattern-layer',
                    'type': 'fill',
                    'source': 'shape',
                    'paint': {
                        'fill-pattern': 'pattern'
                    }
                });
            }
        );
    }, [map])

    // Display the places GeoJSON on load
    useEffect(() => {
        if (!map) return;

        fetch('/places.geojson')
            .then(res => res.json())
            .then(result => {
                setFeatures(result.features);
                filterPlaces(result.features);
            })
            .catch(err => { throw err })
    }, [map]);

    const filterPlaces = (features) => {
        if (!map) return;
        
        const geojsonSource = map.getSource('places');
        if(!geojsonSource) return;

        geojsonSource.setData({
            type: "FeatureCollection",
            features: features
        })
    }

    const handleSearchPlaces = (value) => {
        if (!map) return;

        const filteredFeatures = features.filter(feature => feature.properties.name.toLowerCase().includes(value.toLowerCase()))
        filterPlaces(filteredFeatures)
    }

    return <div>
        <h1>Statvis</h1>
        <div className="sidebar">
            <span>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</span>
            <input className='search-input' placeholder='Search' onChange={(e) => handleSearchPlaces(e.target.value)} />
        </div>

        <div ref={mapContainer} className="map-container" />
    </div>;
}
