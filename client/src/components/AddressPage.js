import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Route } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { State, City } from 'country-state-city'; // Import the necessary objects
import "../styles/forms.css";
import PaymentGatewayPage from "./PaymentGatewayPage";

const AddressPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    pincode: '',
    streetAddress: '',
    state: '',
    city: '',
    errors: {}
  });

  const [form, setForm] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/wedease/address', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data);

        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Submit form data
            console.log("Form data:", formData);
            // Reset form
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                pincode: '',
                streetAddress: '',
                state: '',
                city: '',
                errors: {}
            });

            alert("Submitted");
            window.location.href = '/PaymentGatewayPage';
            <Route path="/PaymentGatewayPage" element={<PaymentGatewayPage />} />

        } else {
            setFormData({ ...formData, errors });
        }
    };

    const validateForm = () => {
        const errors = {};
        const { name, email, phoneNumber, pincode, streetAddress, state, city } = formData;
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = "Mobile no. is required";
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Mobile no. is invalid";
        }
        if (!pincode) {
            errors.pincode = "Pincode is required";
        } else if (pincode.length < 6) {
            errors.password = "Please enter a valid pincode";
        }
        if (!streetAddress.trim()) {
            errors.streetAddress = "Address is required";
        }
        if (!state.trim()) {
            errors.city = "Please mention your state";
        }
        if (!city.trim()) {
            errors.state = "Please mention your city";
        }




        if (!agreedToTerms) {
            errors.agreed = "You need to agree terms and conditions";
        }
        return errors;
    };

    const { name, email, phoneNumber, pincode, streetAddress, state, city, errors } = formData;

    
    const statesList = State.getStatesOfCountry("IN").map((state) => state.name).sort();
  
    
    const citiesList = state ? City.getCitiesOfState(state, "IN").map((city) => city.name) : [];

    console.log("Selected State:", state); 
  console.log("Cities List:", citiesList);

    return (
        <div className="back">
            <Header />
            <Container
                className="registration-form-container">
                <h2 className="mt-5 mb-4 text-center">
                    Delivery Address </h2>
                <Form onSubmit={handleSubmit}>
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
                    {errors.phoneNumber && <Alert color="danger">{errors.phoneNumber}</Alert>}
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
                    {errors.pincode && <Alert color="danger">{errors.pincode}</Alert>}
                    <FormGroup>
                        <Label for="pincode">Pincode</Label>
                        <Input
                            type="text"
                            id="pincode"
                            name="pincode"
                            pattern="[0-9]{6}"
                            value={pincode}
                            onChange={handleChange}
                            placeholder="Enter your Pincode"
                            className="input-field"
                            required
                        />
                    </FormGroup>
                    {errors.streetAddress && <Alert color="danger">{errors.streetAddress}</Alert>}
                    <FormGroup>
                        <Label for="streetAddress">Street Address</Label>
                        <Input
                            type="textarea"
                            id="streetAddress"
                            name="streetAddress"
                            value={streetAddress}
                            onChange={handleChange}
                            placeholder="Enter your Address"
                            className="input-field"
                            rows="3"
                            required
                        />
                    </FormGroup>
                    {errors.state && <Alert color="danger">{errors.state}</Alert>}
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                            type="select"
                            id="state"
                            name="state"
                            value={state}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Select State</option>
                            {statesList.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    {errors.city && <Alert color="danger">{errors.city}</Alert>}
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={handleChange}
                            placeholder="Enter your city"
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
                        Submit
                    </Button>
                </Form>
            </Container>
            <Footer />
        </div>
    );
};
export default AddressPage;
