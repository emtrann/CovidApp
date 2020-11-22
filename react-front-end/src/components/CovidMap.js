import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import healthRegion from "../data/health.json";
import { useState, useEffect } from "react";
import axios from "axios";
import cors from "cors";

export default function CovidMap() {

  // const [testRegionID, setTestRegionID] = useState("canada");
  // const [testRegionData, setTestRegionData] = useState("test");

  function onEachFeature(HR_UID) {
    console.log(HR_UID);
    axios.get(`https://api.opencovid.ca/summary?loc=${HR_UID}&date=11-19-2020`).then((res) => {
      console.log(res.data)
    });
  }


  // useEffect(() => {
  //   console.log(testRegionID);
  //   axios.get(`https://api.opencovid.ca/summary?loc=${testRegionID}&date=11-19-2020`).then((res) => {
  //     console.log(res.data);
  //     setTestRegionData(res.data);
  //   });
  // }, [testRegionID]);

  return (
    <MapContainer
      style={{ height: "50vh", width: "50vw" }}
      zoom={5}
      center={[56.130367, -106.346771]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {healthRegion.features.map((feature) =>
        <GeoJSON
          data={feature}
          style={() => ({
            color: "#4a83ec",
            weight: 3,
            fillColor: "transparent",
          })}
        >
          <Popup>
            <div>Health Region: {feature.properties.Province} {feature.properties.ENGNAME}</div>
            <div>Case Count: {feature.properties.CaseCount || "Unavailable"}</div>
            <div>Deaths: {feature.properties.Deaths || "Unavailable"}</div>
            <div>Recovered: {feature.properties.Recovered || "Unavailable"}</div>
            <div>Tests: {feature.properties.Tests || "Unavailable"}</div>
          </Popup>
        </GeoJSON>
      )}
    </MapContainer>
  );
}