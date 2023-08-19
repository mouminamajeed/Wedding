import React, { useContext } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faInfoCircle, faAddressBook, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {

    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/" className="brand-logo">
                    WeddEase
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" className="nav-link">
                            <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
                        </Nav.Link>
                        <Nav.Link href="/CategoryButtons" className="nav-link">
                            <FontAwesomeIcon icon={faList} className="nav-icon" /> Categories
                        </Nav.Link>
                        <Nav.Link href="#about" className="nav-link">
                            <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" /> About
                        </Nav.Link>
                        <Nav.Link href="/contact" className="nav-link">
                            <FontAwesomeIcon icon={faAddressBook} className="nav-icon" /> Contact
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto"> {/* Use ml-auto to push items to the right */}
                        
                        <NavLink to="/CartPage" className="cart-button">
                            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" /> Cart
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;