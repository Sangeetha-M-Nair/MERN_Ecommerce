import React, { useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { addItem } from "./CartHelper";

export default function Card(product) {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <naviagte to="/cart" />;
    }
  };

  return (
    <div>
      {/* --------------------redirect------------- */}
      {shouldRedirect(redirect)}
      <div
        item={product}
        key={product._id}
        className="col-sm-6 col-md-4 col-lg-3"
      >
        <div className="box" style={{ backgroundColor: "powderblue" }}>
          <div className="option_container">
            <div key={product._id} className="options">
              <button
                data-toggle="modal"
                data-target="#exampleModal"
                // onClick={() => onAdd(product._id)}
                              onClick={addToCart}
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
            {/* </table>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
