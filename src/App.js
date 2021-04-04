import React from "react";
import "./App.css";
import Controls from "./components/Controls";
import Grid from "./components/Grid";
import { StateProvider } from "./store.js";

const size = 25;

function App() {
  return (
    <StateProvider width={size} height={size}>
      <div className="App">
        <Grid width={size} height={size} />
        {/* <Controls /> */}
      </div>
    </StateProvider>
  );
}

export default App;
