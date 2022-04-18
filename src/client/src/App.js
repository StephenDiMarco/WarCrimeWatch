import React, { useState, useEffect } from "react";
import MapChart from "./OnGoingWarCrimesMap";
import CountrySelect from "./CountrySelect";
import ReactTooltip from "react-tooltip";
import "./App.css";
import Header from "./Header";
import Box from "@mui/material/Box";

function App() {
  const [selectededCountry, setSelectedCountry] = useState([]);
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <Header/>
      <div>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
            <CountrySelect setSelectedCountry={setSelectedCountry}/>
            <MapChart setTooltipContent={setContent} setSelectedCountry={setSelectedCountry}/>
            <ReactTooltip>{content}</ReactTooltip>
        </Box>
      </div>
    </div>
  );
}

export default App;
