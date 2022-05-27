import React, { useState } from "react";
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";

function MerChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useParams();

  let navigate = useNavigate();
  console.log(oldPassword);

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  async function reset(e) {
    e.preventDefault();

    const resetData = {
      // otp:otp,
      oldpassword: oldPassword,
      newpassword: newPassword,
      passwordVerify: confirmPassword,
      token: token,
    };

    try {
      await Axios.post(
        `http://localhost:5000/authMerchant/change-password/._id`,
        resetData
      );

      //console.log(document.cookie);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    // await getUser();
    alert("Password updated successfully");
    alert("Logging out ...Please log in again");
    // navigate("/login");
    //console.log(document.cookie);
    logout();

    navigate("/merchantlogin");
  }

  return (
    <div>
      <div>
        <div>
          <div className="sub_page">
            <div className="hero_area">
              {/* header section starts */}
              <header className="header_section">
                <div className="container">
                  <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <div className="navbar-brand">
                      <img
                        width={250}
                        src="../../images/logo.png"
                        alt="image"
                      />
                    </div>
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
                          </Link>
                          {/* <span className="sr-only">(current)</span> */}
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
                  <div className="col-md-12">
                    <div className="full">
                      <h3>Change Password</h3>
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
                        id="form"
                        // action="index.html"
                        onSubmit={reset}
                      >
                        <fieldset>
                          <input
                            id="form-username"
                            value={oldPassword}
                            type="text"
                            placeholder="Enter old password "
                            onChange={(e) => setOldPassword(e.target.value)}
                          />

                          <input
                            id="form-password"
                            value={newPassword}
                            type="password"
                            placeholder="Enter new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <input
                            id="form-Cpassword"
                            value={confirmPassword}
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />

                          <button
                            className="btn btn-primary"
                            type="submit"
                            defaultValue="Submit"
                          >Submit</button>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* end why section */}
            {/* arrival section */}

            {/* footer section */}
            <footer className="footer_section">
              <div className="container">
                <div className="row">
                  {/* <div className="col-md-4 footer-col">
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
                  </div> */}
                  {/* <div className="col-md-4 footer-col">
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
                  </div> */}
                  {/* <div className="col-md-4 footer-col">
                    <div className="map_container">
                      <div className="map">
                        <div id="googleMap" />
                      </div>
                    </div>
                  </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default MerChangePassword;
