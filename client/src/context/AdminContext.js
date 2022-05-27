import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

const AdminContext = createContext();

function AdminContextProvider(props) {
  const [admin, setAdmin] = useState(undefined);

  async function getAdmin() {
    const adminRes = await Axios.get("http://localhost:5000/auth/loggedIn");
    setAdmin(adminRes.data);
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, getAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContext;

export { AdminContextProvider };
