import React, { useState , useRef} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/forms.css";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,   
  Button,
  Alert
} from "reactstrap";
import SellerHome from "./SellerHome";


const UpdateSellerProfile = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    bio: "",
    image: "",
    password: "",
    confirmPassword: "",
    errors: {}
  });

  const [form, setForm] = useState({});


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validateForm();
  
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('DOB', formData.DOB);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);
      formDataToSend.append('image', fileInputRef.current.files[0]);
      try{
      const response = await fetch('http://localhost:8080/wedease/seller', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle successful registration, such as showing a success message or redirecting to a new page.
        alert('Updated Successful');
        window.location.href = '/SellerHome';
        <Route path="/SellerHome" element={<SellerHome/>} />
      } else {
        // Handle registration error, such as displaying an error message to the user.
        alert('Update Failed');
      }
    } catch (error){
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  }
  else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors,
    })); 
  }
};

const validateForm = () => {
    const errors = {};
    const { password, confirmPassword, } = formData;

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };


  const { name, email, phoneNumber, gender, DOB, bio, image, password, confirmPassword, errors } = formData;


  return (
    <div className="back">
      <Header />
      <Container
        className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Update Profile </h2>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
              
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="image">Upload your image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              value={image}
              onChange={handleChange}
              innerRef={fileInputRef}
              className="input-field"
            />
            
          </FormGroup>

          
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
              
            />
          </FormGroup>
          
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
              
            />
          </FormGroup>
         
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={gender}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
             
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Input>
          </FormGroup>
          
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
          <Button color="primary" block className="submit-button">
            Update Profile
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateSellerProfile;
