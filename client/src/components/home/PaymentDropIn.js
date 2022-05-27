import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import {
  getCart,
  updateItem,
  itemTotal,
  addItem,
  removeItem,
  emptyCart,
  createOrder,
  isAuthenticated,
} from "./CartHelper";
import GetTotal, { getTotal } from "./GetTotal";
import { makePayment, getClientToken } from "../auth/Payment";
import DropIn from "braintree-web-drop-in-react";
import { Link,useParams, useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
// import { getClientToken } from "../auth/Payment";

export default function PaymentDropIn(props) {
  const [items, setItems] = useState([]);
  const { getTotal } = props;
  const [run, setRun] = useState(false);
  const [address, setAddress] = useState([]);
  // const [pincode, setPincode] = useState([]);
  const [dropin, setDropin] = useState(true);
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await Axios.get("http://localhost:5000/authUser/loggedIn");
    setUser(userRes.data);
    console.log("user>>>>>>>>>>>>>." + user);
  }
  useEffect(() => {
        getUser();

  })

  useEffect(() => {
    // const productRes = getCart();
    setItems(getCart());
    // setItems(productRes.data);
  }, [run]);

  const getAmount = () => {
    // let amount = 0;
    // items.map((data, i) => {
    //   amount = amount + data.totalamount;

    // });
    //        console.log("amount", amount);

    // return amount;
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.totalamount;
    }, 0);
    // getTotal();
  };

  let navigate = useNavigate();
  const { cartItems, product, onAdd, onRemove } = props;

  //  const [data, setData] = useState({
  //    loading: false,
  //    success: false,
  //    clientToken: null,
  //    error: "",
  //    instance: {},
  //    address: "",
  //  });
  // const { user, getUser } = useContext(UserContext);

  const [values, setValues] = useState({
    clientToken: null,
    success: "",
    error: "",
    instance: "",
    // address: "",
    //  products: getCart(),
    // amount:getAmount()
    // pincode: pincode,
  });
  const { clientToken, success, error, instance } = values;

  const getToken = () => {
    getClientToken().then((response) => {
      console.log("getcliennttoken........" + response);
      if (response.err) {
        setValues({ ...values, error: response.err });
      } else {
        setValues({ ...values, clientToken: response.clientToken });
      }
    });
  };

  useEffect(() => {
    //  getToken(user, token);
     getToken();
    getUser()
  }, []);

  // const { token } = useParams();
  
    //  const token = isAuthenticated() && isAuthenticated().token;

  const userId = getUser._id;

  const token = getUser.token;

    // const token = values.clientToken;


  const onPurchase = () => {
    instance.requestPaymentMethod().then((data) => {
      let nonce = data.nonce;

      let paymentData = {
        // products: items,
        payment_method_nonce: nonce,
        amount: getAmount(),
        address: deliveryAddress,

        // /pincode:pincodee,
        // amount: getTotal(items),
      };
      //  console.log("amount", getTotal);

      makePayment(paymentData)
        .then((response) => {
          console.log("REsponse", response);
          if (response.err) {
            setValues({ ...values, error: response.err });
          } else {
            setValues({ ...values, error: "", success: response.success });
            console.log("Values **********"+values);
            saveOrder();
            setDropin(false);
            // alert("Payment successfull");
            emptyCart(() => {
              setRun(!run); // run useEffect in parent Cart
              console.log("payment success and empty cart");
              setValues({
                loading: false,
                success: true,
              });
            });
          }
        })
        .catch((err) => {
          setValues({ ...values, error: err, success: "" });
        });
    });
  };
  async function saveOrder(paymentData,token) {
    // e.preventDefault();

    const registerData = {
      address: deliveryAddress,
      amount: getAmount(),
      products: items,
      status:values.success,
      // pincode: pincode,
      // cart: getCart(),
    };
    try {
      console.log(
        "user id=============================================================" +
          user
      );
      await Axios.post(`http://localhost:5000/order/createOrder/${user}`, registerData);
      console.log("registerdata" + registerData);


      // createOrder(user, registerData)
      //   .then((response) =>console.log("createorder")
          // console.log(registerData + " " + "TOKENNNN........................................................." + token)
        // )
        // .catch((err) => console.log(err));

      // await Axios.post(
      //   `http://localhost:5000/order/createOrder/${user}`,
      //   registerData
      // );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }

      return;
    }
  }

  const handleAddress = (event) => {
    setValues({ ...values, address: event.target.value });
  };

  //  const getToken = (userId, token) => {
  //    getClientToken(userId, token).then((data) => {
  //      if (data.error) {
  //        console.log(data.error);
  //        setData({ ...data, error: data.error });
  //      } else {
  //        console.log(data);
  //        setData({ ...data, clientToken: data.clientToken });
  //      }
  //    });
  //  };
  let deliveryAddress = values.address;
  // let pincodee=values.pincode

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div>
      <div className="sub_page">
        <div className="hero_area">
          {/* header section starts */}
          <header className="header_section">
            <div className="container">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="index.html">
                  <img width={250} src="../../images/logo.png" alt="" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                ></button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/userDashboard">
                        HOME
                        {/* <span className="sr-only">(current)</span> */}
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/userProduct">
                        SHOP
                        {/* <span className="sr-only">(current)</span> */}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/userContact">
                        CONTACT
                        {/* <span className="sr-only">(current)</span> */}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/userProfile">
                        USER
                        {/* {user.firstname} */}
                        {/* <span className="sr-only">(current)</span> */}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" onClick={logout}>
                        Logout
                        {/* <span className="sr-only">(current)</span> */}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <sup>{itemTotal()}</sup>
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 456.029 456.029"
                          style={{
                            enableBackground: "new 0 0 456.029 456.029",
                          }}
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                                          c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                              />
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                                          C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                                          c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                                          C457.728,97.71,450.56,86.958,439.296,84.91z"
                              />
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                                          c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                              />
                            </g>
                          </g>
                          {/* <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g> */}
                        </svg>
                      </a>
                    </li>
                    <form className="form-inline">
                      <button
                        className="btn  my-2 my-sm-0 nav_search-btn"
                        type="submit"
                      >
                        <i className="fa fa-search" aria-hidden="true" />
                      </button>
                    </form>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
          {/* end header section */}
        </div>
        {/* inner page section */}

        {/* <section className="inner_page_head col-md-4">
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-12">
              <div className="full">
                <h3>User Log in</h3>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        <section className="inner_page_head">
          <div className="container_fuild">
            <div className="row">
              <div className="col-md-8">
                <div className="full">
                  <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          <span className="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Payment <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                    </ul>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          <span className="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          <span className="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end inner page section */}
        {/* why section */}

        {/* end why section */}
        {/* arrival section */}

        <section className="arrival_section">
          <div className="container">
            {clientToken && (
              <div>
                <DropIn
                  options={{ authorization: clientToken }}
                  onInstance={(instance) =>
                    setValues({ ...values, instance: instance })
                  }
                />
                {/* <GetTotal products={items} /> */}
              </div>
            )}

            {dropin && (
              <div>
                <form className="form" id="form" encType="multipart/form-data">
                  <fieldset>
                    <input
                      defaultValue={values.address}
                      type="text"
                      placeholder="Enter your Delivery Address"
                      onChange={handleAddress}
                    />
                    {/* <input
                      defaultValue={pincode}
                      type="text"
                      placeholder="Enter your pincode"
                      onChange={(e) => setPincode(e.target.value)}
                    /> */}
                    <input value={getAmount()} type="text" readOnly />
                  </fieldset>
                </form>
                <button
                  onClick={() => onPurchase()}
                  className="btn btn-success"
                >
                  Pay
                </button>
              </div>
            )}
            {/* <div className="box"> */}
            {/* <div className="arrival_bg_box">
              <img
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                src="../../images/arrival-bg.png"
                alt="image"
              /> */}
            {/* <img
                  width={250}
                  src={require("../../images/arrival-bg.jpg")}
                  alt=""
                /> */}
            {/* client\src\images\arrival-bg.jpg */}
            {/* D:\job\Engineering_Works_MERN\client\src\images\arrival-bg.jpg */}
            {/* </div> */}
            {/* <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="heading_container remove_line_bt">
                  <h2>#NewArrivals</h2>
                </div>
                <p style={{ marginTop: "20px", marginBottom: "30px" }}>
                  famms.com offers high precision suppliers machinery at
                  industry leading prices. Exporters & Importers from the
                  world's largest online B2B marketplace. Logistics Service.
                  Most Popular. Production Monitoring. Trade Assurance.
                </p>
                <a href="#">Shop Now</a>
              </div>
            </div> */}
            {/* </div>  */}
          </div>
        </section>
      </div>
    </div>
  );
}
