import React, { useEffect } from "react";

import { Map as OLMap, View } from "ol";

import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer.js";
import LayerGroup from "ol/layer/Group.js";
import * as olExtent from "ol/extent";

import VectorSource from "ol/source/Vector.js";
import OSMSource from "ol/source/OSM.js";

import KML from "ol/format/KML.js";

import "ol/ol.css";

const Map = ({ style, title, urls }) => {
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
    const map = new OLMap({
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

  return <div id={layerGroup.get("title")} style={style} />;
};

export default Map;
