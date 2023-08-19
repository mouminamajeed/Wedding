import React, { useState , useRef} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/SellerPr.css";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import ShoppingServices from "./ShoppingServices";
import SellerCategories from "../data/sellerCategories";

const categoryOptions = SellerCategories.map((category, i) => (
  <option value={category.name} key={i}>
    {category.name}
  </option>
));

const SellerPr = () => {
  const [products, setproducts] = useState({
    name: "",
    price: "",
    description: "",
    Category: "",
    images: [],  // Change to an array to hold multiple images
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setproducts({ ...products, [name]: value });
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setproducts({ ...products, images:  [...files] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", products.name);
      formDataToSend.append("price", products.price);
      formDataToSend.append("description", products.description);
      formDataToSend.append("Category", products.Category);

      // Append each image file to the FormData object
      for (let i = 0; i < products.images.length; i++) {
        formDataToSend.append("images", products.images[i]);
      }

      try {
        const response = await fetch("http://localhost:8080/wedease/uproduct", {
          method: "POST",
          body: formDataToSend
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          alert("product uploaded");
          window.location.href = '/ShoppingServices';
          //<Route path="/ShoppingServices" element={<ShoppingServices />} ></Route>
        } else {
          alert("product not uploaded");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred.");
      }
    } else {
      setproducts(prevFormData => ({
        ...prevFormData,
        errors
      }));
    }
  };


  const validateForm = () => {
    const errors = {};
    const { name,description,price } = products;
    if (!name.trim()) {
      errors.name = "product Name is required";
    }
    if (!price) {
     errors.price = "Please specify price";
   }
    if (!description.trim()) {
     errors.description = "Please specify description";
    }
    if (!products.images) {
      errors.images = 'Please upload your photo';
    }
    if (!products.Category) {
      errors.Category = 'product category is required';
    }
    return errors;
  };

  const { name, price,description,Category, errors } = products;

  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Product upload</h2>
        <Form onSubmit={handleSubmit} >
          {errors.name && <Alert color="danger">{errors.name}</Alert>}
          <FormGroup>
            <Label for="name">Product Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter the Product Name"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.image && <Alert color="danger">{errors.image}</Alert>}
          <FormGroup>
          <Label for="images">Product Image</Label>
          <Input
            multiple
            type="file"
            name="images"
            id="images"
            onChange={handleImageChange}
            className="input-field"
          />
        </FormGroup>

          {errors.price && (
            <Alert color="danger">{errors.price}</Alert>
          )}
          <FormGroup>
            <Label for="phoneNumber">Product Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={handleChange}
              placeholder="Enter the product price."
              className="input-field"
              required
            />
          </FormGroup>
         
          {errors.description && <Alert color="danger">{errors.description}</Alert>}
          <FormGroup>
            <Label for="description">Product Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="Tell us about the product."
              rows="3"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.Category && (
              <Alert color="danger">{errors.Category}</Alert>
            )}
          <FormGroup>
            <Label for="Category">Category</Label>
            <Input
              type="select"
              name="Category"
              id="Category"
              value={Category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                -- Select a category --
              </option>
              {categoryOptions}
            </Input>
            </FormGroup>
          <Button color="primary" block className="submit-button">
            Upload 
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default SellerPr;

 