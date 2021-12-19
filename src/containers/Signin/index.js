import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Input from '../../components/UI Component/inputs/index';
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style.css';
/**
* @author
* @function Signin
**/

const Signin = (props) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const dispatch = useDispatch();
const auth = useSelector(state => state.auth);



  const userLogin = (e) =>{
e.preventDefault();
    const user ={
      email, password
    }

    dispatch(login(user));
    
  }


  if(auth.authenticate){
    
    return <Redirect to={`/`} />

  }

  return(
    <Layout>
        <Container>
      
            <Row style={{marginTop:'50px'}}>
                <Col md={{span: 6, offset:3}} >
                <Form onSubmit={userLogin} className="signin-css" >
                <h2>Login To </h2>
              
                <h2>Soulbyindian Admin</h2>
                <Input
                    
                     placeholder="Enter Your Email"
                     value = {email}
                     type="email"
                     onChange={(e) =>setEmail(e.target.value)}
                     className="form-control-sm"
                     />

                 <Input
                   
                     placeholder="Enter Your Password"
                     value = {password}
                     type="password"
                     onChange={(e) =>setPassword(e.target.value)}
                     className="form-control-sm"
                     
                     />

<Button variant="primary" type="submit" style={{backgroundColor: '#cb8364', border:'none'}}>
    Login
  </Button>

</Form>
                </Col>
                
            </Row>
       
        </Container>
    </Layout>
   )

 }

export default Signin