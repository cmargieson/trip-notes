import React, { useEffect } from "react";

import { Map, View } from "ol";

import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer.js";
import LayerGroup from "ol/layer/Group.js";
import * as olExtent from "ol/extent";

import VectorSource from "ol/source/Vector.js";
import OSMSource from "ol/source/OSM.js";

import KML from "ol/format/KML.js";

import "ol/ol.css";

const MapComponent = ({ style, title, urls }) => {
  var layerGroup = new LayerGroup({
    title,
    layers: urls.map(
      (url) =>
        new VectorLayer({
          source: new VectorSource({ url, format: new KML() }),
        })
    ),
  });

  useEffect(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSMSource() }), layerGroup],
      target: layerGroup.get("title"),
      view: new View({ center: [0, 0], zoom: 1 }),
    });

    var extent = olExtent.createEmpty();

    layerGroup.on("change", () => {
      layerGroup.getLayers().forEach((layer) => {
        olExtent.extend(extent, layer.getSource().getExtent());
      });

      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
      });
    });

    return () => map.setTarget(null);
  }, []);

  return (
    <div id={layerGroup.get("title")} style={style} />

    // return <div style={{ height: "650px", width: "100%" }} id={target} />;
  );
};

// function MapComponent({ kml, target }) {
//   useEffect(() => {
//     const source = new VectorSource({ url: kml, format: new KML() });

//     const vectorLayer = new VectorLayer({ source });

//     const tileLayer = new TileLayer({ source: new OSMSource() });

//     const view = new View({ center: [0, 0], zoom: 1 });

//     const map = new Map({
//       layers: [tileLayer, vectorLayer],
//       target,
//       view,
//     });

//     vectorLayer.getSource().on("featuresloadend", () => {
//       map.getView().fit(vectorLayer.getSource().getExtent(), {
//         padding: [50, 50, 50, 50],
//       });
//     });

//     return () => map.setTarget(null);
//   }, []);

//   return <div style={{ height: "650px", width: "100%" }} id={target} />;
// }

export default MapComponent;
