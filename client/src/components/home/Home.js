import React, { useState, useRef } from "react";

// import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

function Home() {
  const firstItemRef = useRef(null);

  return (
    <div>
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
                        <Link className="nav-link" to="">
                          HOME
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/userLogin"
                          onClick={() => alert("Please Sign-in to Shop our Products..")}
                        >
                          SHOP
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to=""
                          onClick={() => firstItemRef.current.scrollIntoView()}
                        >
                          CONTACT
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>
                      {/* <li className="nav-item"> */}
                      {/* <a className="nav-link"> */}
                      {/* <Link className="nav-link" to="/admin">
                          Admin
                        </Link> */}

                      {/* <span className="sr-only">(current)</span> */}
                      {/* </a> */}
                      {/* </li> */}
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Sign In
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link className="dropdown-item" to="/admin">
                            Admin
                          </Link>
                          <Link className="dropdown-item" to="/merchantLogin">
                            Merchant
                          </Link>
                          <div className="dropdown-divider"></div>
                          <Link className="dropdown-item" to="userLogin">
                            User
                          </Link>
                        </div>
                      </li>

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
                <div className="col-md-12">
                  <div className="full">
                    <h3>Welcome to Engineering Works</h3>
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
                    <h6>
                      Established in the year 1992, we, famms Engineering Works,
                      have consolidated a descent space for ourselves in the
                      market are widely recognized as one of the reputed
                      manufacturers, suppliers, exporters and traders of a wide
                      range of Food Processing Machines. In this range we have a
                      wide variety to offer that can be availed from us in the
                      most comprehensive range. We have an extended gamut of
                      these machines Namkeen Making Machines, Potato Chips
                      Making Machines and Baking Machines. These can easily
                      cater to the variegated needs of our industrial patrons.
                      Our workers at the factory have ensured that the machines
                      are as per the predefined standards of the industry and
                      are made out of the best quality metal and components
                      only. This helps ensure the longevity of these and offer a
                      completely hygienic and pure production. Further in our
                      range we have machines such as chips making machines, for
                      various kinds of chips such as potatoes, banana chips. For
                      making various kinds of namkeens and farsans as well we
                      have various machines and their equipments range available
                      with us. Our range is so variegated that it easily offers
                      a distinct experience every time.
                    </h6>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end why section */}
          {/* arrival section */}

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
                </div>
                <div className="row">
                  <div className="col-md-6 ml-auto">
                    <div className="heading_container remove_line_bt">
                      <h2>#NewArrivals</h2>
                    </div>
                    <p style={{ marginTop: "20px", marginBottom: "30px" }}>
                      Enginnering works offers high precision suppliers
                      machinery at industry leading prices. Exporters &
                      Importers from the world's largest online B2B marketplace.
                      Logistics Service. Most Popular. Production Monitoring.
                      Trade Assurance.
                    </p>
                    <a href="#">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* footer section */}
          <footer className="footer_section">
            <div className="container" Item ref={firstItemRef}>
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
                      Engineering works
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
  );
}

export default Home;
