import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import UserBasket from "../home/UserBasket";
import { addItem } from "./CartHelper";

export default function CartBootModal(props) {
  //   const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(0);
  const {
    id,
    setAddtocart,
    cartItems,
    setCartItems,
    onRemove,
    product,
    products,
    onAdd,
  } = props;
  let navigate = useNavigate();

  useEffect((id) => {
    Axios.get(`http://localhost:5000/product/add-to-cart/${id}`);
  }, []);

  async function gotocart() {
    navigate("/userCart");

    // return (

    //   // <UserBasket
    //   //   cartItems={cartItems}
    //   //   onRemove={onRemove}
    //   //   product={products}
    //   //   onAdd={onAdd}
    //   // />
    // );
  }
  async function getUser() {
    const userRes = await Axios.get("http://localhost:5000/authUser/loggedIn");
    setUser(userRes.data);
  }

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add to cart{" "}
            </h5>
            <button
              type="button"
              className="close"
              data-target=".bd-example-modal-lg"
              data-toggle="modal"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <table className="table ">
              <thead>
                <tr className="table-info">
                  <td> Product Name </td>
                  <td>Price</td>

                  <td>Quantity:</td>
                </tr>
              </thead>
              <tr>
                <td>name</td>
                <td>100</td>
                <td>
                  <span
                    className="btn btn-danger"
                    style={{ color: "black" }}
                    // onClick={decreaseQty}
                  >
                    -
                  </span>

                  <input type="number" value="1" readOnly />
                  <span
                    className="btn btn-primary plus"
                    style={{ color: "black" }}
                  >
                    +
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setAddtocart(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => gotocart()}
            >
              Go to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
