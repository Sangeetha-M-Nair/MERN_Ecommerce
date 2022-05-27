import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import UProductShop from "../home/UProductShop";
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
// import CartBootModal from "../home/CartBootModal";
// import { post } from "jquery";

// import SearchProducts from "./SearchProducts";
import { addItem, itemTotal, getCart } from "./CartHelper";

function UserProduct(props) {
  // useEffect(() => {
  //   // const productRes = getCart();
  //   setItems(getCart());
  //   // setItems(productRes.data);
  // }, [run]);

  const [user, setUser] = useState(0);
  //const [search, setSearch] = useState("");
  //const [productDetails, setProductDetails] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [cartItems, setCartItems] = useState([]);

  const [redirect, setRedirect] = useState(false);

  async function getUser() {
    const userRes = await Axios.get("http://localhost:5000/authUser/loggedIn");
    setUser(userRes.data);
  }

  let navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [addtocart, setAddtocart] = useState(false);
  // const { cartItems, onAdd, onRemove } = props;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(
    (id) => {
      // getProduct(id);
      fetch(`http://localhost:5000/product/productsAll?page=${pageNumber}`)
        .then((response) => response.json())
        .then(({ totalPages, products }) => {
          setProducts(products);
          setNumberOfPages(totalPages);
          getUser();
        });
    },

    [pageNumber]
  );

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  async function addToCart(product) {
    // console.log('added');
    addItem(product, setRedirect(true));
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      //do last after localstorage correction
      return navigate("/userCart");
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist - 1 } : x
        )
      );
    }
  };

  async function getProduct() {
    const productRes = await Axios.get(
      "http://localhost:5000/product/productsAll"
    );
    // console.log(id);
    // setProducts(productRes.data);
    console.log(productRes.data);
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

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
                    <Link className="nav-link" to="/userDashboard">
                      HOME
                      {/* <span className="sr-only">(current)</span> */}
                    </Link>
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
                    <a className="nav-link" href="/userCart">
                      {/* <Link
                        //  style={isActive(history, "/userCart")}
                        to="/userCart"
                      > */}{" "}
                      <sup>{itemTotal()}</sup>
                      {/* </Link> */}
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
                    <input
                      className="btn  my-2 my-sm-0 nav_search-btn"
                      placeholder="Search products"
                      style={{
                        borderColor: "black",
                        borderWidth: 5,
                        width: 250,
                      }}
                      id="searchInput"
                      type="text"
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                    />
                  </form>
                </ul>
              </div>
              {/* <!-- Modal --> */}

              {/* {addtocart === true && (
                <CartBootModal
                  setAddtocart={setAddtocart}
                  onRemove={onRemove}
                  product={products}
                  onAdd={onAdd}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              )} */}
              {/* end modal */}
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
                <h3>Product Grid</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------------------redirect------------- */}
      {shouldRedirect(redirect)}

      {/* end inner page section */}
      {/* product section */}
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our <span>products</span>
            </h2>
          </div>
          <h3>Page of {pageNumber + 1}</h3>
          {/* {searchOn && <SearchProducts />} */}
          {!searchOn && (
            <div className="row">
              {products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.machname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product, id) => {
                  return (
                    <div
                      key={product._id}
                      className="col-sm-6 col-md-4 col-lg-3"
                    >
                      <div
                        className="box"
                        style={{ backgroundColor: "powderblue" }}
                      >
                        <div className="option_container">
                          <div key={product._id} className="options">
                            <button
                              data-toggle="modal"
                              data-target="#exampleModal"
                              // onClick={() => onAdd(product._id)}
                              onClick={() => addToCart(product)}
                              // onClick={addToCart(product._id)}
                              className="option1"
                            >
                              + Add To Cart
                            </button>
                            <br />
                            {/* <button
                                                  className="btn btn-danger"
                                                  onClick={() => onRemove(product)}
                                                  href
                                                  className="option1"
                                                >
                                                  - Remove
                                                </button> */}
                            <Link className="option2" to="/userCart">
                              Buy Now
                            </Link>
                          </div>
                        </div>
                        <div
                          className="img-box"
                          style={{
                            contain: "layout",
                          }}
                        >
                          <img
                            src={`http://localhost:5000/uploads/${product.Pimage}`}
                            alt="image"
                          />
                        </div>
                        <div className=" table-info w-auto">
                          {/* <table> */}
                          <tr>
                            <td colSpan="2">
                              <b>{product.machname}</b>
                            </td>
                          </tr>

                          <tr>
                            <td>Cost:{product.cost}/- </td>

                            <td>Weight:{product.weight}kg</td>
                          </tr>
                          <tr>
                            <td>{product.offer} Off</td>
                            <td>
                              <b>T Rs.{product.totalamount}/-</b>
                            </td>
                          </tr>
                          <tr>Stock: {product.quantity} nos</tr>
                          {/* </table>{" "} */}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* (< UProductShop key = { id } products = { products } product = { product } />) */}

              {/* </div> */}
              <div className="btn-box">
                <button className="btn-outline-primary" onClick={gotoPrevious}>
                  Previous
                </button>
                {pages.map((pageIndex) => (
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
              {/* <a href>View All products</a> */}
            </div>
          )}
        </div>
      </section>
      {/* end product section */}
      {/* footer section */}
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col">
              <div className="footer_contact">
                <h4>Reach at..</h4>
                <div className="contact_link_box">
                  <a>
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>Location</span>
                  </a>
                  <a>
                    <i className="fa fa-phone" aria-hidden="true" />
                    <span>Call +01 1234567890</span>
                  </a>
                  <a>
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a href="" className="footer-logo">
                  Titan Machinery
                </a>
                <p>
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with
                </p>
                <div className="footer_social">
                  <a>
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a>
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a>
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                  <a>
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                  <a>
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

export default UserProduct;
