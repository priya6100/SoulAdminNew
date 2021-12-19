import React from 'react';
import Header from '../Headder/index';
// import {Container} from 'react-bootstrap'
import {Jumbotron, Row, Col, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import './style.css';
import { IoIosHome } from 'react-icons/io';
import { BiGridAlt, BiTachometer } from 'react-icons/bi';
import { MdAccountCircle, MdAssessment, MdDashboard, MdLayers, MdPages, MdShoppingBasket } from "react-icons/md";
import { useSelector } from 'react-redux';

/**
* @author
* @function Layout
**/

const Layout = (props) => {

  const auth = useSelector(state => state.auth);
  return(
    <>
    <Header />
    {
      props.sidebar ? 
      <Container fluid>
<Row>
  <Col md={2} className="sidebar">

    <div className="userInfo">
       <div className="userIcon">
       <MdAccountCircle />
       </div>
       <div className="userTextL">
         <h5>{auth.user.fullName} <span>{auth.user.email}</span> </h5>
         {/* <h6>{auth.user.email}</h6> */}
       </div>
       {/* <div className="userBtn">
         <button>Logout</button>
       </div> */}
    </div>

<ul>
  <li> <NavLink exact to={`/`}> <span><MdDashboard /></span> Dashboard</NavLink> </li>
  <li> <NavLink to={`/page`}> <span><MdPages /></span> Page</NavLink> </li>
  <li> <NavLink to={`/category`}> <span><MdLayers /></span> Category</NavLink> </li>
  <li> <NavLink to={`/products`}> <span><MdShoppingBasket /></span> Products</NavLink> </li>
  <li> <NavLink to={`/orders`}> <span><MdAssessment /></span> Orders</NavLink> </li>
</ul>

  </Col>
  <Col md={10} style={{marginLeft: 'auto', paddingTop: '60px'}}>{props.children}</Col>
</Row>
</Container>
   :
props.children
    }


 
  
    </>
   )

 }

export default Layout;