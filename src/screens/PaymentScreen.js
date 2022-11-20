import React from 'react'
import { useState} from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, FormCheck  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer' 
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps' 
import { useNavigate } from 'react-router-dom';
import{ savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({}) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress  } = cart
  const navi = useNavigate()


  if(!shippingAddress) {
    navi('/shipping')
  }


   const [paymentMethod, setPaymentMethod] = useState('PayPal')
  

   const dispatch = useDispatch()

  const submitHandler = (e) => {

    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navi('/placeorder')

  }

  return <FormContainer>

        <CheckoutSteps step1 step2 step3 />

       <h1>Payment Method</h1>
       <Form onSubmit={submitHandler}>
        <FormGroup>
            <FormLabel as='legend' >Select Method</FormLabel>

       
        <Col>
        <FormCheck type='radio' label='PayPal or Credit Card' id='PayPal' name='PaymentMethod' value='Paypal'
        checked
        onChange={(e) => setPaymentMethod(e.target.value) }></FormCheck>

<FormCheck type='radio' label='Stripe' id='Stripe' name='PaymentMethod' value='Stripe'
        
        onChange={(e) => setPaymentMethod(e.target.value) }></FormCheck>
        
        </Col>
        </FormGroup>
     
        <Button type='submit' variant='primary'>Continue</Button>

       </Form>
  </FormContainer>
  
}

export default PaymentScreen
