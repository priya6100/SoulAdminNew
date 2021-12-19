import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions";
import './style.css';
import { IoIosLogIn, IoIosLogOut, IoIosPerson, IoIosPower } from "react-icons/io";
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
           <IoIosPower /> 
          </span>
        </li>
        <li className="nav-item">
          <NavLink to ="/admin/signin" className="nav-link">
            <IoIosLogIn /> Admin Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to ="/admin/signup" className="nav-link">
            <IoIosPerson /> Admin Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Login</Nav.Link> */}

        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
          <IoIosLogIn /> Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
          <IoIosPerson /> Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar

      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>

          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
