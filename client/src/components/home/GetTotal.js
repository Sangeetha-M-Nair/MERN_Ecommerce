import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import {
  getProducts,
  processPayment,
  createOrder,
} from "./CartHelper";
import {  getBraintreeClientToken } from "../auth/Payment";

import UserContext from "../../context/UserContext";

export default function GetTotal({
  products,
  setRun = (f) => f,
  run = undefined,
}) {
  // const [data, setData] = useState({
  //   loading: false,
  //   success: false,
  //   clientToken: null,
  //   error: "",
  //   instance: {},
  //   address: "",
  // });
  const { user, getUser } = useContext(UserContext);

  //   const userId = getUser._id;
    
  // const token = getUser.token;

  //   const getToken = (userId, token) => {
      
  //   getBraintreeClientToken(userId, token).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //       setData({ ...data, error: data.error });
  //     } else {
  //       console.log(data);
  //       setData({ clientToken: data.clientToken });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getToken(userId, token);
  // }, []);

  // const handleAddress = (event) => {
  //   setData({ ...data, address: event.target.value });
  // };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.totalamount;
    }, 0);
  };

  // return <div>{JSON.stringify(products)}</div>;
  return (
    <div>
      <h2>Total:${getTotal()}</h2>
    </div>
  );
}
