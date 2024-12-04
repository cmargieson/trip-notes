import React from "react";
import Layout from "@theme/Layout";

import Map from "@site/src/components/Map";
import kml from "../../../blog/2024-11-15-rydal-dirt-biking/rydal-dirt-biking.kml"

import Card from "@site/src/components/Card";
import CardBody from "@site/src/components/Card/CardBody";
import CardHeader from "@site/src/components/Card/CardHeader";

import styles from "./styles.module.css";

export default function Hello() {
  return (
    <body className={styles.body}>
      <Layout>
        <content className={styles.content}>
          <nav className={styles.nav}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </nav>
          <map className={styles.map}>
            <Map
              style={{ height: "100%", width: "100%" }}
              title={"Rydal Dirt Biking"}
              urls={[kml]}
            />
          </map>
        </content>
      </Layout>
    </body>
  );
}

function Item() {
  return (
    <Card shadow="tl" className={styles.card}>
      <CardHeader>
        <h3>Lorem Ipsum</h3>
      </CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida.
      </CardBody>
    </Card>
  );
}
