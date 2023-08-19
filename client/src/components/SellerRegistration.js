import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import SellerCategories from "../data/sellerCategories";
import SellerLogin from "./SellerLogin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const categoryOptions = SellerCategories.map((category, i) => (
  <option value={category.name} key={i}>
    {category.name}
  </option>
));

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    bio: "",
    image: "",
    address: "",
    bname: "",
    password: "",
    confirmPassword: "",
    category: "", // Add the category field to your initial state
    errors: {},
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
     
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("DOB", formData.DOB);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("bname", formData.bname);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      formDataToSend.append("image", fileInputRef.current.files[0]);

      try {
        const response = await fetch("http://localhost:8080/wedease/seller", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Handle successful registration, such as showing a success message or redirecting to a new page.
         // alert("Registration Successful");
          window.location.href = "/SellerLogin";
        } else {
          // Handle registration error, such as displaying an error message to the user.
          alert("Registration Failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const {
      name,
      email,
      phoneNumber,
      gender,
      address,
      bname,
      DOB,
      bio,
      image,
      password,
      confirmPassword,
      category,
    } = formData;

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!bname) {
      errors.bname = "Please specify your business name.";
    }

    if (!address) {
      errors.address = "Please specify your address";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Mobile no. is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Mobile no. is invalid";
    }

    if (!DOB) {
      errors.DOB = "Please specify your Date of Birth";
    }

    if (!gender.trim()) {
      errors.gender = "Please specify your gender";
    }

    if (!formData.image) {
      errors.image = "Please upload your photo";
    }

    if (!bio.trim()) {
      errors.bio = "Please specify your bio";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      errors.agreed = "You need to agree to the terms and conditions";
    }

    if (!category.trim()) {
      errors.category = "Please select a category";
    }

    return errors;
  };

  const {
    name,
    email,
    phoneNumber,
    gender,
    DOB,
    address,
    bname,
    bio,
    password,
    confirmPassword,
    category,
    errors,
    image,
  } = formData;

  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Seller/vendor Registration</h2>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {errors.name && <Alert color="danger">{errors.name}</Alert>}
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.image && <Alert color="danger">{errors.image}</Alert>}
          <FormGroup>
            <Label for="image">Upload your image</Label>
            <Input
              type="file"
              name="image"
              id="image"
             // value={image}
              onChange={handleChange}
              innerRef={fileInputRef}
              className="input-field"
            />
          </FormGroup>
          {errors.email && <Alert color="danger">{errors.email}</Alert>}
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
              required
            />
          </FormGroup>
          {errors.phoneNumber && (
            <Alert color="danger">{errors.phoneNumber}</Alert>
          )}
          <FormGroup>
            <Label for="phoneNumber">Mobile no.</Label>
            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Mobile no."
              className="input-field"
              required
            />
          </FormGroup>
          {errors.address && <Alert color="danger">{errors.address}</Alert>}
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.DOB && <Alert color="danger">{errors.DOB}</Alert>}
          <FormGroup>
            <Label for="DOB">Date of Birth</Label>
            <Input
              type="date"
              name="DOB"
              id="DOB"
              onChange={handleChange}
              value={DOB}
              placeholder="Enter your DOB"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.gender && <Alert color="danger">{errors.gender}</Alert>}
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={gender}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Input>
          </FormGroup>
          {errors.bname && <Alert color="danger">{errors.bname}</Alert>}
          <FormGroup>
            <Label for="bname">Business Name</Label>
            <Input
              type="text"
              name="bname"
              id="bname"
              value={bname}
              onChange={handleChange}
              placeholder="Enter your business name"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.bio && <Alert color="danger">{errors.bio}</Alert>}
          <FormGroup>
            <Label for="bio">Bio</Label>
            <Input
              type="textarea"
              name="bio"
              id="bio"
              value={bio}
              onChange={handleChange}
              placeholder="Tell us about yourself."
              rows="3"
              className="input-field"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              value={category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                -- Select a category --
              </option>
              {categoryOptions}
            </Input>
            {errors.category && (
              <Alert color="danger">{errors.category}</Alert>
            )}
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
              required
            />
          </FormGroup>
          {errors.confirmPassword && (
            <Alert color="danger">{errors.confirmPassword}</Alert>
          )}
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.agreed && <Alert color="danger">{errors.agreed}</Alert>}
          <FormGroup>
            <Label check>
              <Input
                type="checkbox"
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                checked={agreedToTerms}
              />{" "}
              I agree to the terms and conditions
            </Label>
          </FormGroup>
          <Button color="primary" block className="submit-button">
            Register
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default SellerRegistration;
