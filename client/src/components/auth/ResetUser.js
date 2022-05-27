import React, { useState, useContext } from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "../../context/UserContext";


function ResetUser() {
    const [user, setUser] = useState(undefined);

  //const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  // const [formPasswordVerify, setFormPasswordVerify] = useState("");
  // const [otp, setOtp] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const { token } = useParams();
  console.log("resetpage token   " + token);
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  // const { getUser } = useContext(UserContext);

 async function getUser() {
   const userRes = await Axios.get("http://localhost:5000/authUser/loggedIn");
   setUser(userRes.data);
 }


  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  async function reset(e) {
    e.preventDefault();

    const resetData = {
      // otp:otp,
      password: formPassword,
      // passwordVerify: formPasswordVerify,
      token: token,
    };

    try {
      await Axios.post(
        `http://localhost:5000/authUser/neww-password/._id`,
        resetData
      );
      console.log(formPassword);
      //console.log(document.cookie);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    navigate("/userLogin");
    //console.log(document.cookie);
    // await getMerchant();
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
                          <Link className="nav-link" to="/">
                            HOME
                          </Link>
                          {/* <span className="sr-only">(current)</span> */}
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/">
                            CONTACT
                          </Link>
                          {/* <span className="sr-only">(current)</span> */}
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
                      <form id="form" onSubmit={reset}>
                        <fieldset>
                          <label htmlFor="form-password">Password</label>
                          <input
                            className="password"
                            id="form-password"
                            type={passwordShown ? "text" : "password"}
                            placeholder="Enter your new password"
                            value={formPassword}
                            onChange={(e) => setFormPassword(e.target.value)}
                            autoComplete="off"
                          />
                          <i
                            className="far fa-eye"
                            id="togglePassword"
                            onClick={togglePassword}
                          ></i>

                          {/* <label htmlFor="form-passwordVerify">Verify Password </label>
        <input
          id="form-passwordVerify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
          autoComplete="off"
        /> */}

                          <button className="btn-submit" type="submit">
                            Update Password
                          </button>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* end why section */}
            {/* arrival section */}
            {/* 
            <section className="arrival_section">
              <div className="container">
                <div className="box">
                  <div className="arrival_bg_box">
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
                    />
                    {/* <img
                  width={250}
                  src={require("../../images/arrival-bg.jpg")}
                  alt=""
                /> */}
            {/* client\src\images\arrival-bg.jpg */}
            {/* D:\job\Engineering_Works_MERN\client\src\images\arrival-bg.jpg */}
            {/* </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto">
                      <div className="heading_container remove_line_bt">
                        <h2>#NewArrivals</h2>
                      </div>
                      <p style={{ marginTop: "20px", marginBottom: "30px" }}>
                        Titan Machinery offers high precision suppliers
                        machinery at industry leading prices. Exporters &
                        Importers from the world's largest online B2B
                        marketplace. Logistics Service. Most Popular. Production
                        Monitoring. Trade Assurance.
                      </p>
                      <a href="#">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

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
        </div>
      </div>
    </div>
  );
}

export default ResetUser;
