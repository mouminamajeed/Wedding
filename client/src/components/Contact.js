import React from 'react';
import "../styles/Contact.css";
import MYK from '../assets/Myk.jpg';
import Jaisa from '../assets/jasia.jpeg';
import Moumina from '../assets/momina.jpg';
import Header from './Header';
import Footer from './Footer';


function Contact() {
  return (
    <div className='contactbody'>
    <Header />
    <section className="containers">
      <h2 className="title">
        <span className="primary">Meet our team</span>
        <span className="secondary">These individuals work together to make WeddEase function</span>
      </h2>

      <div className="gallery-wrapper">
        <figure className="gallery-item">
          <img src={MYK} alt="" className="item-image" />

          <figcaption className="item-description">
            <h2 className="name">Mohd Yafis Khan</h2>
            <span className="role">Developer</span>
          </figcaption>
        </figure>
        <figure className="gallery-item">
          <img src={Moumina} alt="" className="item-image" />

          <figcaption className="item-description">
            <h2 className="name">Moumina Majeed</h2>
            <span className="role">Developer</span>
          </figcaption>
        </figure>
        <figure className="gallery-item">
          <img src={Jaisa} alt="" className="item-image" />

          <figcaption className="item-description">
            <h2 className="name">Jasia Hassan</h2>
            <span className="role">Developer</span>
          </figcaption>
        </figure>
      </div>
    </section>
    <Footer />
    </div>
  );
}

export default Contact;
