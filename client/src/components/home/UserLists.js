import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserLists() {
  const [user, setUser] = useState([]);


const [pageNumber, setPageNumber] = useState(0);
const [numberOfPages, setNumberOfPages] = useState(0);
const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  async function getUserList() {
    const userRes = await Axios.get("http://localhost:5000/auth/allusers");
    setUser(userRes.data);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/auth/allusers?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, user }) => {
        setUser(user);
        setNumberOfPages(totalPages);
        // getUserList();
      });
  }, [pageNumber]);

  let navigate = useNavigate();

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

   const gotoPrevious = () => {
     setPageNumber(Math.max(0, pageNumber - 1));
   };

   const gotoNext = () => {
     setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
   };


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
                    <div className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to="/adminDashboard">
                          HOME
                        </Link>
                        {/* <span className="sr-only">(current)</span> */}
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/createAdminContact">
                          CONTACT
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/adminDashboard">
                          ADMIN
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
                          <Link className="nav-link" to="/userLists">
                            Users List
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
          <section className="why_section layout_padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="full">
                    <form
                      className="form"
                      id="form"
                      encType="multipart/form-data"
                    >
                      <fieldset>
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Mobile No</th>
                              {/* <th>email</th>
                              <th>mobno</th>
                              <th>address</th>
                              <th>city</th>
                              <th>zipcode</th> */}
                            </tr>
                          </thead>
                          {user.map((user, i) => {
                            return (
                              <tbody>
                                <tr i={i} key={user._id}>
                                  <td>{user.firstname}</td>
                                  <td>{user.lastname}</td>
                                  <td>{user.email}</td>

                                  <td>{user.phone}</td>
                                  {/* <td>{user.email}</td>
                                  <td>{user.mobno}</td>
                                  <td>{user.address}</td>
                                  <td>{user.city}</td>
                                  <td>{user.zipcode}</td> */}
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
              <div className="btn-box">
                <button className="btn-outline-primary" onClick={gotoPrevious}>
                  Previous
                </button>
                { pages.map((pageIndex) => (
                  <button
                    className="btn-primary"
                    key={pageIndex}
                    onClick={() => setPageNumber(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
                <button className="btn-outline-primary" onClick={gotoNext}>
                  Next
                </button>
              </div>
            </div>
          </section>
          {/* end why section */}
          {/* arrival section */}

          {/* footer section */}
          <footer className="footer_section">
            <div className="container">
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

export default UserLists;
