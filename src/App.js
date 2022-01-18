import React from "react";
import "./App.css";
import Controls from "./components/Controls";
import Grid from "./components/Grid";
import { Splits } from "./components/Splits";
import { StateProvider } from "./store.js";

const size = 15;

function App() {
  return (
    <StateProvider width={size} height={size}>
      <div className="App">
        <Splits width={size} height={size} />
        <Controls />
        <Grid width={size} height={size} />
      </div>
    </StateProvider>
  );
}

export default App;
