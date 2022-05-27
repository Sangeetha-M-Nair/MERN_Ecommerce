import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/misc/Navbar";
import AdminLogin from "./components/auth/AdminLogin";
import AdminDashboard from "./components/home/AdminDashboard";
import UserDashboard from "./components/home/UserDashboard";
import MerchantDashboard from "./components/home/MerchantDashboard";
import UpdateMerchant from "./components/home/UpdateMerchant";
import UserProduct from "./components/home/UserProduct";
import Home from "./components/home/Home";
import UserRegister from "./components/auth/UserRegister";
import UserLogin from "./components/auth/UserLogin";
import MerchantLogin from "./components/auth/MerchantLogin";
import MerchantRegistration from "./components/auth/MerchantRegistration";
import MerchantProfile from "./components/home/MerchantProfile";
import MerchantContact from "./components/home/MerchantContact";
import MerForgotPassword from "./components/auth/MerForgotPassword";
import MerChangePassword from "./components/auth/MerChangePassword";
import CreateProducts from "./components/home/CreateProducts";
import ProductsLists from "./components/home/ProductsLists";
import MerchantLists from "./components/home/MerchantLists";
import EditProductList from "./components/home/EditProductList";
import AdminCreateCategory from "./components/home/AdminCreateCategory";
import CreateAdminContact from "./components/home/CreateAdminContact";
import UserContact from "./components/home/UserContact";
import UserLists from "./components/home/UserLists";
import ResetMerchant from "./components/auth/ResetMerchant";
import UserProfile from "./components/home/UserProfile";
import UpdateUser from "./components/home/UpdateUser";
import UserChangePassword from "./components/home/UserChangePassword";
import ResetUser from "./components/auth/ResetUser";
import UserForgotPassword from "./components/auth/UserForgotPassword";
import UProductshop from "./components/home/UProductShop";
import UserBasket from "./components/home/UserBasket";
import UserCart from "./components/home/UserCart";
import PaymentDropIn from "./components/home/PaymentDropIn";
import UserOrders from "./components/home/UserOrders";
import MerchantOrderProList from "./components/home/MerchantOrderProList";
import MercStock from "./components/home/MercStock";
import OrderProductView from "./components/home/OrderProductView";
import AutoComplete from "./components/home/AutoComplete";

function Router() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar />   */}
        <Routes>
          <Route exact path="/allorders" element={<MerchantOrderProList />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
          <Route exact path="/updateUser" element={<UpdateUser />} />
          <Route exact path="/userOrders" element={<UserOrders />} />
          <Route exact path="/stock" element={<MercStock />} />
          <Route exact path="/autocomplete" element={<AutoComplete />} />

          <Route
            exact
            path="/orderProductView/:id"
            element={<OrderProductView />}
          />
          <Route
            exact
            path="/userChangePassword"
            element={<UserChangePassword />}
          />
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/adminDashboard" element={<AdminDashboard />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userRegister" element={<UserRegister />} />
          <Route exact path="/userLogin" element={<UserLogin />} />
          <Route exact path="/merchantProfile" element={<MerchantProfile />} />
          <Route exact path="/merchantLogin" element={<MerchantLogin />} />
          <Route exact path="/merchantContact" element={<MerchantContact />} />
          <Route exact path="/createProducts" element={<CreateProducts />} />
          <Route exact path="/userProduct" element={<UserProduct />} />
          <Route exact path="/userContact" element={<UserContact />} />
          <Route exact path="/userDashboard" element={<UserDashboard />} />
          <Route exact path="/merchantLists" element={<MerchantLists />} />
          <Route exact path="/userLists" element={<UserLists />} />
          <Route exact path="/reset/:token" element={<ResetMerchant />} />
          <Route exact path="/resetUser/:token" element={<ResetUser />} />
          <Route exact path="/productshop" element={<UProductshop />} />
          <Route exact path="/userBasket" element={<UserBasket />} />
          <Route exact path="/userCart" element={<UserCart />} />
          <Route
            exact
            path="/admincreateCategory"
            element={<AdminCreateCategory />}
          />
          <Route
            exact
            path="/createAdminContact"
            element={<CreateAdminContact />}
          />
          <Route
            exact
            path="/merforgotpassword"
            element={<MerForgotPassword />}
          />
          <Route
            exact
            path="/userForgotpassword"
            element={<UserForgotPassword />}
          />
          <Route
            exact
            path="/merchangepassword"
            element={<MerChangePassword />}
          />
          <Route exact path="/productsLists" element={<ProductsLists />} />
          <Route exact path="/editProduct/:id" element={<EditProductList />} />
          <Route exact path="/payment" element={<PaymentDropIn />} />
          <Route
            exact
            path="/merchantRegister"
            element={<MerchantRegistration />}
          />
          <Route exact path="/updateMerchant" element={<UpdateMerchant />} />
          <Route
            exact
            path="/merchantDashboard"
            element={<MerchantDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
