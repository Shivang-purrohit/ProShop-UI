import React from 'react'
import { useState} from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer' 
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps' 
import { useNavigate } from 'react-router-dom';

const ShippingScreen = ({}) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress  } = cart
  const navi = useNavigate()


   const [address, setAddress] = useState(shippingAddress.address)
   const [city, setCity] = useState(shippingAddress.city)
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
   const [country, setCountry] = useState(shippingAddress.country)

   const dispatch = useDispatch()

  const submitHandler = (e) => {

    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navi('/payment')

  }

  return <FormContainer>

        <CheckoutSteps step1 step2 />

       <h1>Shipping</h1>
       <Form onSubmit={submitHandler}>

       <FormGroup controlId='address'>
            <FormLabel>Address</FormLabel>
            <FormControl
             type='text'
             placeholder='Enter Address'
             value={address}
             required
             onChange={(e) => setAddress(e.target.value)}></FormControl>

        </FormGroup>

        <FormGroup controlId='address'>
            <FormLabel>Address</FormLabel>
            <FormControl
             type='text'
             placeholder='Enter Address'
             value={address}
             required
             onChange={(e) => setAddress(e.target.value)}></FormControl>

        </FormGroup>

        <FormGroup controlId='city'>
            <FormLabel>City</FormLabel>
            <FormControl
             type='text'
             placeholder='Enter City'
             value={city}
             required
             onChange={(e) => setCity(e.target.value)}></FormControl>

        </FormGroup>

        <FormGroup controlId='postalCode'>
            <FormLabel>Postal Code</FormLabel>
            <FormControl
             type='text'
             placeholder='Enter Postal Code'
             value={postalCode}
             required
             onChange={(e) => setPostalCode(e.target.value)}></FormControl>

        </FormGroup>

        <FormGroup controlId='country'>
            <FormLabel>Country</FormLabel>
            <FormControl
             type='text'
             placeholder='Enter Country'
             value={country}
             required
             onChange={(e) => setCountry(e.target.value)}></FormControl>

        </FormGroup>

        <Button type='submit' variant='primary'>Continue</Button>

       </Form>
  </FormContainer>
  
}

export default ShippingScreen
