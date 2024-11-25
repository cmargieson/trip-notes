import Layout from "@theme/Layout";

import MapComponent from "@site/src/components/MapComponent";

import "ol/ol.css";

import rydal from "@site/static/data/motorcycle-routes/rydal.kml";
import geesarmsouth from "@site/static/data/motorcycle-routes/gees-arm-south.kml";

const Page = () => {
  return (
    <Layout title="Motorbike Routes">
      <MapComponent
        style={{ height: "100%", width: "100%", position: "fixed" }}
        title={"motorbike-routes"}
        urls={[geesarmsouth, rydal]}
      />
    </Layout>
  );
};

export default Page;
