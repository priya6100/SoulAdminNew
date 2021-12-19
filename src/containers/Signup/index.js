import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Input from '../../components/UI Component/inputs/index';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '../../actions';
import './style.css';
/**
* @author
* @function Signup
**/

const Signup = (props) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.loading) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
        }
      }, [user.loading]);

    const userSignup = (e) =>{
        e.preventDefault();
        const user ={
            firstName, lastName, email, password
        }
        dispatch(SignUp(user))
    }

  if(auth.authenticate){

    return <Redirect to={`/`} />

  }
  if(user.loading){

    return <p>loading......!</p>

  }
  return(
    <Layout>
    <Container>
        <Row style={{marginTop:'50px'}}>
            <Col md={{span: 6, offset:3}}>
            <Form onSubmit={userSignup} className="signin-css">
            <h2>Signup To</h2>
            <h2>Soulbyindian Admin</h2>
                <Row>
                    <Col md={6}>
                     <Input
                
                     placeholder="Enter First Name"
                     value = {firstName}
                     type="text"
                     onChange={(e) =>setFirstName(e.target.value)}
                     className="form-control-sm"
                     />
                    </Col>
                    <Col md={6}>
                    <Input
              
                     placeholder="Enter Last Name"
                     value = {lastName}
                     type="text"
                     onChange={(e) =>setLastName(e.target.value)}
                     className="form-control-sm"
                     />
                    </Col>
                </Row>
                <Input
                  
                     placeholder="Enter Email"
                     value = {email}
                     type="email"
                     onChange={(e) =>setEmail(e.target.value)}
                     className="form-control-sm"
                     />

                 <Input
                
                     placeholder="Enter Password"
                     value = {password}
                     type="password"
                     onChange={(e) =>setPassword(e.target.value)}
                     className="form-control-sm"
                     />

<Button variant="primary" type="submit" style={{backgroundColor: '#cb8364', border:'none'}}>
Register
</Button>
</Form>
            </Col>
        </Row>
   
    </Container>
</Layout>
   )

 }

export default Signup