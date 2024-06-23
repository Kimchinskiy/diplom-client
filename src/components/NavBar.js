import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container, Form, FormControl, Row, Col, InputGroup} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import logoImage from '../assets/logo.png'; // Путь к вашему изображению логотипа
import "../assets/css/navbar.css";
import searchIcon from "../assets/icons/search.svg";
import basketIcon from "../assets/icons/basket.svg"
import profileIcon from "../assets/icons/profile.svg"


const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();


    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ height: "75px", borderRadius: '0 0 25px 25px' }}>
        <Container>
            <Navbar.Brand as={NavLink} to="/">
                <img
                    src={logoImage} // Устанавливаем путь к изображению
                    alt="TechStore Logo" // Устанавливаем альтернативный текст для изображения
                    style={{ height: '25px', marginRight: '15px' }} // Устанавливаем размеры и отступы для изображения
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form className="d-flex align-items-center">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="search-input"
                    />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </Form>

                <Nav className="nav-links">
                    <NavLink to={PROFILE_ROUTE} className="login-button">
                        <img src={profileIcon} alt="Profile" className="login-icon" />
                    </NavLink>
                </Nav>

                <Nav className="nav-links">
                    <NavLink to={BASKET_ROUTE} className="basket-button">
                        <img src={basketIcon} alt="Basket" className="basket-icon" />
                    </NavLink>
                </Nav>

            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
});

export default NavBar;
