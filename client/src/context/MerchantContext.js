import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

const MerchantContext = React.createContext();

function MerchantContextProvider(props) {

// const MerchantContext = React.createContext();

  const [merchant, setMerchant] = useState(undefined);

  async function getMerchant() {
    const merchantRes = await Axios.get(
      "http://localhost:5000/authMerchant/merchantLoggedIn"
    );
    setMerchant(merchantRes.data);
    
  }

  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <MerchantContext.Provider value={{ merchant, getMerchant }}>
      {props.children}
    </MerchantContext.Provider>
  );
}

export default MerchantContext;

export { MerchantContextProvider };
