import React, { useState, useEffect } from "react";
import Axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

function OrderProductView(order) {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const { id } = useParams();

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  async function getProducts() {
    const productsRes = await Axios.get(
      `http://localhost:5000/order/createOrder/${id}`
    );
    setProducts(productsRes.data);
  }
  useEffect(() => {
    // getProduct(id);
    console.log("id------------------------------------" + id);
    getProducts();
  }, []);

  async function getUser() {
    const userRes = await Axios.get(
      "http://localhost:5000/authUser/userProfile"
    );
    setUser(userRes.data);
  }

  useEffect((user) => {
    getUser();
    // getOrders(user);
  }, []);

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  return (
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
                    <a className="nav-link" href="">
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
                    <a className="nav-link" href="">
                      {user.firstname}
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
      <section className="inner_page_head">
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-8">
              <div className="full">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/userProfile">
                        {user.firstname} Profile
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/userOrders">
                        {user.firstname} Order details
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <span className="sr-only">(current)</span>
                      </Link>
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
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              <span>products</span>
            </h2>
          </div>
          <h3></h3>
          <div className="row">
            {products.map((item, i) => {
              return (
                <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
                  <div
                    className="box"
                    style={{ backgroundColor: "powderblue" }}
                  >
                    <div className="option_container">
                      <div key={item._id} className="options">
                        <br />
                        {/* <button
                          className="btn btn-danger"
                          onClick={() => onRemove(product)}
                          href
                          className="option1"
                        >
                          - Remove
                        </button> */}
                      </div>
                    </div>
                    <div
                      className="img-box"
                      style={{
                        contain: "layout",
                      }}
                    >
                      <img
                        src={`http://localhost:5000/uploads/${item.Pimage}`}
                        alt="image"
                      />
                    </div>
                    <div className=" table-info w-auto">
                      {/* <table> */}
                      <tr>
                        <td colSpan="2">
                          <b>{item.machname}</b>
                        </td>
                      </tr>

                      <tr>
                        <td>Cost:{item.cost}/- </td>
                      </tr>
                      <tr>
                        <td>Quantity:{item.count} </td>
                      </tr>
                      <tr>
                        <td colSpan="2">{item._id}</td>
                      </tr>
                      <tr>
                        <td colSpan="2"></td>
                      </tr>
                      {/* <tr>
                        <td>{products.offer} Off</td>
                        <td>
                          <b>T Rs.{products.totalamount}/-</b>
                        </td>
                      </tr> */}
                      {/* </table>{" "} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* end why section */}
      {/* arrival section */}

      <section className="arrival_section">
        <div className="container"></div>
      </section>

      {/* footer section */}
    </div>
  );
}

export default OrderProductView;
