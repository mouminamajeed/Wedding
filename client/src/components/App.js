import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import WorkerRegistration from "./WorkerRegistration";
import Main from "./Main";
import Contact from "./Contact";
import SellerButtons from "./SellerButtons";
import WorkerCategory from "./WorkerCategory";
import WorkerLogin from "./WorkerLogin";
import WorkerHome from "./WorkerHome";
import WorkerProfile from "./WorkerProfile";
import WorkerDetails from "./WorkerDetails";
import CategoryButtons from "./CategoryButtons";
import CartPage from "./CartPage";
import AddressPage from "./AddressPage";
import PaymentGatewayPage from "./PaymentGatewayPage";
import UpdateProfile from "./UpdateProfile";
import UpdateProfileSeller from "./UpdateProfileSeller";
import SellerPr from "./SellerPr";

import SellerRegistration from "./SellerRegistration";
import SellerLogin from './SellerLogin';
import SellerHome from './SellerHome';
import {AuthProvider}  from "../context/AuthProvider";
import UploadProduct from './UploadProduct';
import ShoppingServices from "./ShoppingServices";
import Catelog from "./Catelog";

function App() {

  return (
    <div>
       <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/SellerButtons" element={<SellerButtons />} exact />
        <Route path="/WorkerRegistration" element={<WorkerRegistration />} exact />
        <Route path="/WorkerLogin" element={<WorkerLogin />} exact />
        <Route path="/SellerRegistration" element={<SellerRegistration />} exact />
        <Route path="/SellerLogin" element={<SellerLogin />} exact />
        <Route path="/SellerHome" element={<SellerHome />} exact />


        <Route path="/UpdateProfileSeller" element={<UpdateProfileSeller />} exact />
        <Route path="/SellerPr" element={<SellerPr />} exact />
        
        <Route path="/SellerHome" element={<SellerHome />} exact />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/CategoryButtons" element={<CategoryButtons />} />
        <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
        <Route path="/WorkerHome" element={<WorkerHome />} exact />


        <Route path="/workers/:category" element={<WorkerProfile />} exact />
        <Route path="/workers/:category/:workerId" element={<WorkerDetails/>} exact />
        <Route path="/CartPage" element={<CartPage />} exact />
        <Route path="/address" element={<AddressPage />} exact />
        <Route path="/PaymentGatewayPage" element={<PaymentGatewayPage/>} exact />
        <Route path="/UpdateProfile" element={<UpdateProfile />} exact />
        <Route path="/UploadProduct" element={<UploadProduct />} exact />
        <Route path="/AuthProvider" element={<AuthProvider/>} />   
        <Route path="/ShoppingServices" element={<ShoppingServices/>} />    
        <Route path="/sellers/:category" element={<Catelog />} /> 
        

      </Routes>
      </AuthProvider>
      </div>
    
  );
}

export default App;