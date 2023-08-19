import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Card, CardImg } from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/forms.css";

const UploadProduct = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleDeleteImage = (index) => {
    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setUploadedImages(newUploadedImages);
  };

  return (
    <div className="back"> 
    <Header />
    <Container className="registration-form-container">
      <h2 className="mt-5 mb-4 text-center">Upload Images</h2>
      <Form>
        <FormGroup>
          <Label for="images"></Label>
          <Input
            multiple
            type="file"
            name="images"
            id="images"
            onChange={handleImageChange}
          />
        </FormGroup>
        <Button color="primary" block className="submit-button">
          Upload 
        </Button>
      </Form>

      <Container className="mt-4">
        <h2 className="text-center">Uploaded Images</h2>
        <div className="uploaded-images">
          {uploadedImages.map((image, index) => (
            <Card key={index} className="uploaded-image-card">
              <CardImg
                top
                width="100%"
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index}`}
              />
              <Button
                color="danger"
                onClick={() => handleDeleteImage(index)}
                className="delete-button"
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Container>
    <Footer />
    </div>
  );
};

export default UploadProduct;
