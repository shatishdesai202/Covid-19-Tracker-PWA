import React from 'react';

import './map.css';

import { Map as MapLeaflet , TileLayer } from "react-leaflet";

// import {Map as LeafletMap} from 'leaflet';

import { showDataOnMap } from '../util';

function Mapx({ countries,center, zoom, casesType }) {
    // console.log('>>>',center);
    // console.log('>>>',zoom);
    return (
        <div className="map">  
            <MapLeaflet  center={ center }  zoom={zoom}>

                <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                { showDataOnMap(countries, casesType) }

            </MapLeaflet>
        </div>
    )
}

export default Mapx;