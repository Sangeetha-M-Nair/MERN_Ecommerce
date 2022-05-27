import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
// import { getBraintreeClientToken } from "./CartHelper";
import DropIn from "braintree-web-drop-in-react";
import UserProduct from "./UserProduct";
import UserContext from "../../context/UserContext";
import {
  getCart,
  updateItem,
  itemTotal,
  addItem,
  removeItem,
} from "./CartHelper";
import {processPayment,getBraintreeClientToken} from "../auth/Payment"
import GetTotal from "./GetTotal";



export default function UserCart(product) {

    let navigate = useNavigate();


   useEffect(() => {
     getUser();
   }, []);

  const { user, getUser } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(product.count);

  

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  useEffect(() => {
    // const productRes = getCart();
    setItems(getCart());
    // setItems(productRes.data);
  }, [run]);

  // const [show, setShow] = useState(true);

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br />{" "}
      <Link to="/userProduct">Continue shopping</Link>
    </h2>
  );

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

                    {/* <span className="sr-only">(current)</span> */}
                    {/* </a> */}
                    {/* <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <li>
                          <a href="testimonial.html">CONTACT</a>
                        </li>
                        <span className="nav-label">
                          SHOP <span className="caret" />
                        </span> */}
                    {/* </a> */}

                    {/* <ul className="dropdown-menu">
                        <li>
                          <a href="testimonial.html">CONTACT</a>
                        </li>
                      </ul> */}
                    {/* </li> */}
                    {/* <li className="nav-item">
                      <a className="nav-link" href="product.html">
                        Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="blog_list.html">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="contact.html">
                        Contact
                      </a>
                    </li> */}
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
                          ADD TO CART <span className="sr-only">(current)</span>
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
                  {/* <div style={{ display: "block", width: 700, padding: 30 }}> */}
                  <Modal.Dialog
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    // centered
                  >
                    <Modal.Header className="inner_page_head">
                      <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Add to cart</h2>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h6>Your cart has {`${items.length}`} items</h6>

                      <table className="table ">
                        <thead>
                          <tr className="table-info">
                            <td> Product Name </td>
                            <td>Price</td>

                            <td>Quantity:</td>
                            <td></td>
                          </tr>
                        </thead>
                        {items.map((product, i) => (
                          <tr>
                            <td>{product.machname}</td>
                            <td>{product.totalamount}</td>
                            <td>
                              {/* <span
                                className="btn btn-danger"
                                style={{
                                  color: "black",
                                  backgroundColor: "#eb5234",
                                }}
                                // onClick={decreaseQty}
                              >
                                -
                              </span> */}

                              <input
                                type="number"
                                value={product.count}
                                onChange={handleChange(product._id)}
                              />
                              {/* <span
                                className="btn btn-primary"
                                style={{
                                  color: "black",
                                  backgroundColor: "#5c7de0",
                                }}
                                // value={count}
                                // onChange={handleChange(product._id)}
                              >
                                +
                              </span> */}
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  removeItem(product._id);
                                  setRun(!run); // run useEffect in parent Cart
                                }}
                                // onClick={gotoPrevious}
                              >
                                Remove{" "}
                              </button>{" "}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </Modal.Body>
                    <GetTotal products={items} />
                    <Button
                      className="btn btn-info "
                      href="/userProduct"
                      style={{ backgroundColor: "#cff4fc", color: "black" }}
                    >
                      Back to shopping{" "}
                    </Button>
                    <Modal.Footer>
                      {user ? (
                        <Button
                          className="btn btn-danger"
                          variant="Search" href ="/payment"
                          // onClick={() => {
                          //   getToken(userId, token);
                          // }}
                        >
                          Proceed to Payment
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-danger"
                          variant="Search"
                          to="/userLogin"
                        >
                          please signin to checkout
                        </Button>
                      )}
                      {/* <Button variant="secondary">Close</Button> */}
                    </Modal.Footer>
                  </Modal.Dialog>
                </div>
              </div>
              {/* <br />
              <p>
                Don't have an account yet?{" "}
                <Link to="/userRegister">Register here</Link>
              </p> */}
            </div>
          </div>
          {/* </div> */}
        </section>

        {/* end why section */}
        {/* arrival section */}

        <section className="arrival_section">
          <div className="container">
            
            
          </div>
        </section>

        {/* footer section */}
        <footer className="footer_section">
          <div className="container">
            <div className="row">
            
              
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
