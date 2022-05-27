import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

function UpdateUser() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [mobno, setMobNo] = useState("");

  async function getUser() {
    const userRes = await Axios.get(
      "http://localhost:5000/authUser/userProfile"
    );
    setUser(userRes.data);
  }

  useEffect(() => {
    // if (!user) {
    // setUser([]);
    // } else {
    getUser();

    // editUser();
    // }
  }, []);

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }
  async function register(e) {
    e.preventDefault();

    const registerData = {
      firstname: firstName,
      lastname: lastName,
      phone: mobno,
      email: Email,
    };

    try {
      await Axios.put(
        "http://localhost:5000/authUser/userUpdate",
        registerData
      );
      // alert("Registration Successful");
      // alert("Please log in again");
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }

      return;
    }
    alert("Profile updated");
    // getMerchant();
    // logOutt();
    // navigate("/merchantLogin");

    console.log(document.cookie);
    await getUser();
    navigate("/userProfile");
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
                        Update User <span className="sr-only">(current)</span>
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
                <form
                  className="form"
                  id="form"
                  onSubmit={register}
                  encType="multipart/form-data"
                >
                  <fieldset>
                    <input
                      defaultValue={user.firstname}
                      type="text"
                      placeholder="Enter your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      defaultValue={user.lastname}
                      type="text"
                      placeholder="Enter your last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                      defaultValue={user.email}
                      type="email"
                      placeholder="Enter your email id"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      defaultValue={user.phone}
                      type="text"
                      placeholder="Enter your Mobile number"
                      onChange={(e) => setMobNo(e.target.value)}
                    />

                    <input type="submit" default defaultValue="Submit" />
                  </fieldset>
                </form>
              </div>
              {/* <br />
              <p>
                Don't have an account yet?{" "}
                <Link to="/userRegister">Register here</Link>
              </p> */}
            </div>
          </div>
        </div>
      </section>
      {/* end why section */}
      {/* arrival section */}

      <section className="arrival_section">
        <div className="container">
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

      {/* footer section */}
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col">
              <div className="footer_contact">
                <h4>Reach at..</h4>
                <div className="contact_link_box">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>Begumpet</span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true" />
                    <span>Call +01 1234567890</span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>Sangeetha@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a href="" className="footer-logo">
                  Famms
                </a>
                <p>
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with
                </p>
                <div className="footer_social">
                  <a href="">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-pinterest" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="map_container">
                <div className="map">
                  <div id="googleMap" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-info">
            <div className="col-lg-7 mx-auto px-0">
              <p>
                © <span id="displayYear" /> All Rights Reserved By
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
  );
}

export default UpdateUser;
