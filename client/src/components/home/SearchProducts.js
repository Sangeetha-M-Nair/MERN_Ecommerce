// import React, { useEffect, useState, useContext } from "react";
// import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
// import UProductShop from "../home/UProductShop";
// import ReactDOM from "react-dom";
// import ErrorMessage from "../misc/ErrorMessage";

// function SearchProducts() {
//   const [pageNumber, setPageNumber] = useState(0);
//   const [numberOfPages, setNumberOfPages] = useState(0);
//   const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
//   const [cartItems, setCartItems] = useState([]);
// const [products, setProducts] = useState([]);
// const [items, setItems] = useState([]);
// const [addtocart, setAddtocart] = useState(false);
    
//   async function onAdd(id) {
//     // const { id } = useParams();
//     setAddtocart(true);
//     const cartItems = {
//       productId: id,
//       quantity: 1,
//       user: user,
//     };
//     const onRemove = (product) => {
//       const exist = cartItems.find((x) => x.id === product.id);
//       if (exist.qty === 1) {
//         setCartItems(cartItems.filter((x) => x.id !== product.id));
//       } else {
//         setCartItems(
//           cartItems.map((x) =>
//             x.id === product.id ? { ...exist, qty: exist - 1 } : x
//           )
//         );
//       }
//     };

//     try {
//       await Axios.post(`http://localhost:5000/cart/addItems/${id}`, cartItems);
//       alert("Added to cart successfully");
//     } catch (err) {
//       console.log(err);
//       if (err.response) {
//         if (err.response.data.errorMessage) {
//           setErrorMessage(err.response.data.errorMessage);
//         }
//       }

//       return;
//     }

//     navigate("/UserProduct");

//     await getUser();
//   }

//   const gotoPrevious = () => {
//     setPageNumber(Math.max(0, pageNumber - 1));
//   };

//   const gotoNext = () => {
//     setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
//   };
//   return (
//     <div>
//       <div className="row">
//         {products.map((product, id) => {
//           return (
//             <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
//               <div className="box" style={{ backgroundColor: "powderblue" }}>
//                 <div className="option_container">
//                   <div key={product._id} className="options">
//                     <button
//                       data-toggle="modal"
//                       data-target="#exampleModal"
//                       onClick={() => onAdd(product._id)}
//                       className="option1"
//                     >
//                       + Add To Cart
//                     </button>
//                     <br />
//                     {/* <button
//                           className="btn btn-danger"
//                           onClick={() => onRemove(product)}
//                           href
//                           className="option1"
//                         >
//                           - Remove
//                         </button> */}
//                     <a className="option2">Buy Now</a>
//                   </div>
//                 </div>
//                 <div
//                   className="img-box"
//                   style={{
//                     contain: "layout",
//                   }}
//                 >
//                   <img
//                     src={`http://localhost:5000/uploads/${product.Pimage}`}
//                     alt="image"
//                   />
//                 </div>
//                 <div className=" table-info w-auto">
//                   {/* <table> */}
//                   <tr>
//                     <td colSpan="2">
//                       <b>{product.machname}</b>
//                     </td>
//                   </tr>

//                   <tr>
//                     <td>Cost:{product.cost}/- </td>

//                     <td>Weight:{product.weight}kg</td>
//                   </tr>
//                   <tr>
//                     <td>{product.offer} Off</td>
//                     <td>
//                       <b>T Rs.{product.totalamount}/-</b>
//                     </td>
//                   </tr>
//                   {/* </table>{" "} */}
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* (< UProductShop key = { id } products = { products } product = { product } />) */}

//         {/* </div> */}
//         <div className="btn-box">
//           <button className="btn-outline-primary" onClick={gotoPrevious}>
//             Previous
//           </button>
//           {pages.map((pageIndex) => (
//             <button
//               className="btn-primary"
//               key={pageIndex}
//               onClick={() => setPageNumber(pageIndex)}
//             >
//               {pageIndex + 1}
//             </button>
//           ))}
//           <button className="btn-outline-primary" onClick={gotoNext}>
//             Next
//           </button>
//         </div>
//         {/* <a href>View All products</a> */}
//       </div>
//     </div>
//   );
// }

// export default SearchProducts;
