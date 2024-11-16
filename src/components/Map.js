import React, { useEffect } from "react";

import { Map, View } from "ol";
import "ol/ol.css";

import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer.js";

import VectorSource from "ol/source/Vector.js";
import OSMSource from "ol/source/OSM.js";

import KML from "ol/format/KML.js";

function MapComponent({ kml }) {
  useEffect(() => {
    const source = new VectorSource({
      url: kml,
      format: new KML(),
    });

    const vectorLayer = new VectorLayer({
      source: source,
    });

    const tileLayer = new TileLayer({ source: new OSMSource() });

    const view = new View({
      center: [0, 0],
      zoom: 1,
    });

    const map = new Map({
      layers: [vectorLayer, tileLayer],
      target: "map",
      view: view,
    });

    return () => map.setTarget(null);
  }, []);

  return <div style={{ height: "650px", width: "100%" }} id="map" />;
}

export default MapComponent;
