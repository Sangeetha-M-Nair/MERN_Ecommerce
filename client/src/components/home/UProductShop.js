import React, { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import ErrorMessage from "../misc/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

function UProductShop(i, product, products) {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div>
      ProductS
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="box">
          <div className="option_container">
            <div className="options">
              <a href className="option1">
                Add To Cart
              </a>
              <a href className="option2">
                Buy Now
              </a>
            </div>
          </div>
          <div className="img-box">
            <img
              src={`http://localhost:5000/uploads/${product.Pimage}`}
              alt="image"
            />
          </div>
          <div className="detail-box">
            <h5>{product.catgname}</h5>
            <h5>{product.machname}</h5>
            <h6>${product.cost}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UProductShop;
