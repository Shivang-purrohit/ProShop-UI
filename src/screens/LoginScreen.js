import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { login } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

   
    const location = useLocation()
    const navi = useNavigate()
    
    

    const redirect =  location.search ? location.search.split('=') [1] : '/'

    useEffect(() => {
        if(userInfo) {
        navi('/') 
           // problem :  redirect ? `/?redirect=${redirect}` : '/'       i'm not using redirect, if i use redirect then it does not redirect to '/'
  
          }

    }, [userInfo, redirect])
          
  

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( login(email, password))
    }

  return <FormContainer>

    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message> }
    {loading && <Loader />}
    <Form onSubmit={ submitHandler }>
        <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl
             type='email'
             placeholder='Enter Email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}></FormControl>

        </FormGroup>
          
        <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
             type='password'
             placeholder='Enter Password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}></FormControl>

        </FormGroup>

        <Button type='submit' variant='primary'>
            Sign In
        </Button>
     
      </Form>

      <Row className='py-3'>
        <Col> 
         New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> 
           Register</Link>
        </Col>
      </Row>

  </FormContainer>
      
 
 
  
}

export default LoginScreen
