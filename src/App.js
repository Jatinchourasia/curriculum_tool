import React, { useState } from "react";
import { DndComponent } from "./components/dndComponent";

import { Header } from "./components/header";
import { StandardList } from "./components/standardList";
function App() {
  return (
    <div className="App">
      <Header />
      <StandardList />
    </div>
  );
}

export default App;
