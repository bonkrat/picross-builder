import React from "react";
import "./App.css";
import Controls from "./components/Controls";
import Grid from "./components/Grid";
import { StateProvider } from "./store.js";

function App() {
  console.log("asdfadsf");

  return (
    <StateProvider>
      <div className="App">
        <Grid />
        {/* <Controls /> */}
      </div>
    </StateProvider>
  );
}

export default App;
