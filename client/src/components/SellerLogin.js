import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/forms.css";
import {Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import AuthContext from "../context/AuthProvider";


const SellerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
    recaptchaValue: "",
  });

  const { setAuth, setIsAuth } = useContext(AuthContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRecaptchaChange = value => {
    setFormData({ ...formData, recaptchaValue: value });
  };

  const handleForgotPassword = () => {
    const { email } = formData;
    if (!email.trim()) {
      alert("Please provide your email to reset password.");
      return;
    }

    // Here you can add the logic to send a password reset email to the provided email.
    // You might call an API endpoint to trigger the password reset process.
    alert(`Password reset email sent to ${email}`);
  };

  const handleSubmit =async  e => {
    e.preventDefault();

    const response= await fetch('http://localhost:8080/wedease/sellerlogin',{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const {success,accessToken} = await response.json();
    
    if (success) {
      console.log(accessToken);
      setAuth(accessToken);
      setIsAuth(true);
     // alert("login successfull")
      navigate('/SellerHome');
    } else {
      alert("invalid usename and password");
    }
    
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
        setFormData({
          email: "",
          password: "",
          errors: {},
          recaptchaValue: "",
        });
      } else {
      setFormData({ ...formData, errors });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const { email, password, errors } = formData;

  return (
    <div className="back">
      <Header />
    <Container className="login-form-container">
      <h2 className="mt-5 mb-4 text-center">Seller Login </h2>
      <Form onSubmit={handleSubmit}>
        {errors.login && <Alert color="danger">{errors.login}</Alert>}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input-field"
          />
        </FormGroup>
        {errors.password && <Alert color="danger">{errors.password}</Alert>}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="input-field"
          />
        </FormGroup>
        <FormGroup>
            <ReCAPTCHA
              sitekey="6LcbI5onAAAAAGTN06xLfE3CMmqCMd-zBqjTaXmn"
              onChange={handleRecaptchaChange}
            />
          </FormGroup>
        <Button color="primary" block className="submit-button">
          Login
        </Button>
        <p className="signup-link">
          No account? <a href="/SellerRegistration">Register</a>
        </p>
      </Form>
      <div className="mt-3">
          <Button color="link" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </div>
    </Container>
    <Footer />
    </div>
  );
};

export default SellerLogin;