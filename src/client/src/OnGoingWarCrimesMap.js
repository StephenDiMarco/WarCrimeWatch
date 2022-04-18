import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }, { setSelectedCountry }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/onGoingWarCrimesMap.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
    <PatternLines
      id="lines"
      height={4}
      width={4}
      stroke="#ff3320"
      strokeWidth={2}
      background="#ffa220"
      orientation={["diagonal"]}
    />
    <Sphere stroke="#E4E5E6" strokeWidth={0.05} />
    <Graticule stroke="#E4E5E6" strokeWidth={0.05} />
    {data.length > 0 && (
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
            const { NAME } = geo.properties;
            let fillColor = "#FEFEFE";
            let toolTip   = NAME
            if(d)
            {
              toolTip = NAME + ' - ' + d["Comment"];
              if (d["Perpetrator"] === 'true' && d["Victim"] === 'false') {
                fillColor = "#ff3320";
              } else if (d["Perpetrator"] === 'true' && d["Victim"] === 'true') {
                fillColor = "url('#lines')";
              } else {
                fillColor = "#ffa220";
              }
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fillColor}
                stroke="#000000"
                strokeWidth="0.5"
                onMouseEnter={() => {
                  setTooltipContent(toolTip);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                onMouseDown={()=> {
                  setSelectedCountry(geo.properties.ISO_A2)
                }}
              />
            );
          })
        }
      </Geographies>
    )}
    </ComposableMap>
  );
};

export default MapChart;
