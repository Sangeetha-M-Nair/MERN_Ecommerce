import React, { useState } from "react";
 import { MerchantContextProvider } from "./context/MerchantContext";

import "./App.css";
import Router from "./Router";
import Axios from "axios";
import { UserContextProvider } from "./context/UserContext";
Axios.defaults.withCredentials = true;


function App() {
  return (
    <MerchantContextProvider>
      <UserContextProvider >
      <div className="App">
        <Router />
      </div>
    </UserContextProvider>
    </MerchantContextProvider>
  );
}

export default App;
