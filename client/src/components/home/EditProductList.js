import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantContext from "../../context/MerchantContext";
import ErrorMessage from "../misc/ErrorMessage";

function EditProductList(product) {
  const [merchant, setMerchant] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const [catgName, setCatgName] = useState("");
  const [machName, setMachName] = useState("");
  const [Cost, setCost] = useState("");
  const [Weight, setWeight] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Offer, setOffer] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  // const [Image, setImage] = useState("");

  const [products, setProducts] = useState("");

  let navigate = useNavigate();

  async function logout() {
    await Axios.get("http://localhost:5000/auth/logOut");
    navigate("/");
  }

  async function getProduct() {
    const productRes = await Axios.get(`http://localhost:5000/product/${id}`);
    console.log(id);
    setProducts(productRes.data);
  }

  async function getMerchant() {
    const merchantRes = await Axios.get(
      "http://localhost:5000/authMerchant/merchantProfile"
    );

    setMerchant(merchantRes.data);
  }

  useEffect((id) => {
    // //   console.log("ddddddddddddddddddddddddd"+id);
    // //  Axios.get(`http://localhost:5000/product/${id}`).then((response) => {
    // //    console.log(response.data);
    // //    setProduct(response.data);

    // //    console.log(product);
    //    // getCUser();

    // getMerchant();
    getProduct(id);
    console.log(product);

    //  });
  }, []);

  async function saveProduct(e) {
    e.preventDefault();
    // try {
    //   let form = document.getElementById("form");
    //   let formData = new FormData(form);

    //   Axios.post("http://localhost:5000/upload", formData).then((res) => {
    //     console.log("image uploaded");
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const productData = {
      catgname: catgName,
      machname: machName,
      cost: Cost,
      weight: Weight,
      quantity: Quantity,
      offer: Offer,
      totalamount: TotalAmount,
      //   Pimage: Image,
      //  merchant: merchant,
    };

    function setImage(fakepath) {
      alert("ImageFunc");
    }

    try {
      await Axios.put(`http://localhost:5000/product/${id}`, productData);
      alert("Saved Successfully");
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }

      return;
    }
    // alert("saved successfully");
    // logout();
    navigate("/productsLists");
    // getProducts();

    console.log(document.cookie);
    await getMerchant();
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
                          <Link className="nav-link" to="">
                            <span className="sr-only">(current)</span>
                          </Link>
                        </li>
                      </ul>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="">
                            Edit Profile
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
                    <form
                      className="form"
                      id="form"
                      onSubmit={saveProduct}
                      encType="multipart/form-data"
                    >
                      {/* <fieldset> */}
                      <label htmlFor="form-catg">Category Name</label>

                      <input
                        defaultValue={products.catgname}
                        id="form-catg"
                        type="text"
                        onChange={(e) => setCatgName(e.target.value)}
                      />
                      {/* <select>
                        <option value="Fresh Produce">Grapefruit</option>
                        <option value="Meat">Lime</option>
                        <option selected value="coconut">
                          Coconut
                        </option>
                        <option value="mango">Mango</option>
                      </select> */}

                      <label htmlFor="form-groc">Machine Name</label>

                      <input
                        defaultValue={products.machname}
                        id="form-groc"
                        type="text"
                        onChange={(e) => setMachName(e.target.value)}
                      />
                      <label htmlFor="form-cost">Cost </label>

                      <input
                        defaultValue={products.cost}
                        id="form-cost"
                        type="text"
                        placeholder="Enter the cost"
                        onChange={(e) => setCost(e.target.value)}
                      />
                      <label htmlFor="form-weight">Weight </label>

                      <input
                        defaultValue={products.weight}
                        type="text"
                        id="form-weight"
                        placeholder="Enter weight"
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <label htmlFor="form-quantity">Quantity </label>

                      <input
                        defaultValue={products.quantity}
                        type="text"
                        id="form-quantity"
                        placeholder="Enter the quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <label htmlFor="form-offer">Offer off </label>

                      <input
                        defaultValue={products.offer}
                        type="text"
                        id=""
                        placeholder="Any offers"
                        onChange={(e) => setOffer(e.target.value)}
                      />
                      <label htmlFor="form-total">Total Amount </label>

                      <input
                        defaultValue={products.totalamount}
                        type="text"
                        placeholder="Total amount"
                        onChange={(e) => setTotalAmount(e.target.value)}
                      />
                      {/* <label htmlFor="form-img">Image </label> */}

                      {/* <input
                        id="form-Image"
                        value={image}
                        name="Pimage"
                        type="file"
                        placeholder="No file chosen"
                        onChange={(e) => setImage(e.target.value)}
                        accept="image/*"
                      />  */}
                      <button
                        className="btn-submit"
                        type="submit"
                        name="submit"
                      >
                        Save Product
                      </button>

                      {/* <Link
                          className="btn-edit"
                          type="button"
                          to="/updateMerchant"
                          onClick={() => saveGrocery}
                        >
                          Save Grocery
                        </Link> */}
                      {/* <input type="submit" value="Update" /> */}
                      {/* </fieldset> */}
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

export default EditProductList;
