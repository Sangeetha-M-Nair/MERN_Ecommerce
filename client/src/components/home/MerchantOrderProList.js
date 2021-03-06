import React, { useEffect, useState, useContext, Component } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Select from "react-select";

import MerchantContext from "../../context/MerchantContext";
import ErrorMessage from "../misc/ErrorMessage";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

export default function MerchantOrderProList(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [merchant, setMerchant] = useState([]);
  const [searchOn, setSearchOn] = useState(false);

  const [delStatus, setDelStatus] = useState("");

  // const options = [
  //   "Not processed",
  //   "Processing",
  //   "Shipped",
  //   "Delivered",
  //   "Cancelled",
  // ];
  // const defaultOption = options[0];

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  let navigate = useNavigate();

  async function saveStatus(id) {
    const orderData = {
      status: delStatus,
    };
    await Axios.put(`http://localhost:5000/order/createOrder/${id}`, orderData);
  }
  async function getMerchant() {
    const merchantRes = await Axios.get(
      "http://localhost:5000/authMerchant/merchantProfile"
    );

    setMerchant(merchantRes.data);
    console.log("merchant" + merchant);
  }
  async function getOrder() {
    await Axios.get("http://localhost:5000/order/ordersLists");

    //  setMerchant(merchantRes.data);
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    try {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      console.log(
        "-----------------------------------------------------------------" +
          pageNumber
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrder();
            getMerchant();

  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/order/allorders/:${merchant._id}?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, orders }) => {
        setOrders(orders);
        setNumberOfPages(totalPages);
        getMerchant();
      });
  }, [pageNumber]);

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  return (
    <div>
      <div>
        <div className="sub_page">
          <div className="hero_area">
            {/* header section starts */}
            <header className="header_section">
              <div className="container">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                  <a className="navbar-brand" href="">
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
                    <div className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to="/merchantDashboard">
                          HOME
                        </Link>
                        {/* <span className="sr-only">(current)</span> */}
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/merchantContact">
                          CONTACT
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/merchantProfile">
                          Merchant
                        </Link>
                        {/* <span className="sr-only">(current)</span> */}
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" onClick={logout}>
                          Logout
                          {/* <span className="sr-only">(current)</span> */}
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
                    </div>
                  </div>
                </nav>
              </div>
            </header>
            {/* end header section */}
          </div>
          {/* inner page section */}
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
                          <Link className="nav-link" to="/allorders">
                            View Orders
                            <span className="sr-only">(current)</span>
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
          {!searchOn && (
            <section className="why_section layout_padding">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                    <div className="full">
                      {errorMessage && (
                        <ErrorMessage
                          message={errorMessage}
                          clear={() => setErrorMessage(null)}
                        />
                      )}
                      <br />
                      <h3>Page of {pageNumber + 1}</h3>

                      <form
                        className="form"
                        id="form"
                        encType="multipart/form-data"
                      >
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th>Order id</th>
                              <th>Total Amount</th>
                              <th>Created at</th>
                              <th colSpan={2}>Accept/Reject</th>
                              {/* <th>Cost</th>
                              <th>Weight</th>
                              <th>Quantity</th>
                              <th>Offer</th>
                              <th>Total Amount</th>
                              <th>Edit</th>
                              <th>Delete</th> */}
                            </tr>
                          </thead>

                          {(orders.map((order, id) => {
                            return (
                              <tbody>
                                <tr key={order._id}>
                                  <td>{order._id}</td>
                                
                                  <td>{order.amount}</td>

                                  <td>{order.createdAt}</td>
                                  <td>
                                    {/* <Select
                                      options={options}
                                      value={defaultOption}
                                    /> */}
                                    <select
                                      className="custom-select"
                                      onClick={() => saveStatus(order._id)}
                                      key={order._id}
                                      onChange={(e, id) =>
                                        setDelStatus(e.target.value)
                                      }
                                    >
                                      <option defaultValue={order.status}>
                                        {order.status}{" "}
                                      </option>
                                      <option value="Processing">
                                        Processing
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Delivered">
                                        Delivered
                                      </option>
                                      <option value="Cancelled">
                                        Cancelled
                                      </option>
                                    </select>
                                  </td>
                                  <td>
                                    {/* <button onClick={saveStatus(order._id)}>
                                      Submit
                                    </button> */}
                                    {/* {delStatus(id)} */}
                                  </td>

                                  {/* <td>{product.cost}</td>
                                  <td>{product.weight}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.offer}</td>
                                  <td>{product.totalamount}</td> */}
                                  {/* <td>
                                    <Link
                                      className="btn btn-primary"
                                      to={`/editProduct/${product._id}`}
                                      key={i}
                                      product={{ product }}
                                      getProducts={{ getProducts }}
                                    >
                                      Edit
                                    </Link>
                                  </td> */}
                                </tr>
                              </tbody>
                            );
                          }))}
                        </table>
                        <div key={pageNumber.toString()} className="btn-box">
                          <button
                            className="btn-outline-danger"
                            onClick={gotoPrevious}
                          >
                            Previous
                          </button>
                          {pages.map((pageIndex) => (
                            <button
                              className="btn-grey"
                              key={pageIndex}
                              onClick={() => setPageNumber(pageIndex)}
                            >
                              {pageIndex + 1}
                            </button>
                          ))}
                          <button
                            className="btn-outline-danger"
                            onClick={gotoNext}
                          >
                            Next
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* end why section */}
          {/* arrival section */}

          {/* footer section */}
          <footer className="footer_section">
            <div className="container">
              <div className="footer-info">
                <div className="col-lg-7 mx-auto px-0">
                  <p>
                    ?? <span id="displayYear" /> All Rights Reserved By
                    <a href="https://html.design/">Free Html Templates</a>
                    <br />
                    Distributed By{" "}
                    <a href="https://themewagon.com/" target="_blank">
                      ThemeWagon
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
