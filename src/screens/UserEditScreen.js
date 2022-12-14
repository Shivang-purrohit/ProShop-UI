import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,  FormGroup, FormLabel, FormControl, FormCheck  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 

import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions'
import { useParams } from 'react-router-dom'
import {  USER_UPDATE_RESET  } from '../constants/userConstants'




const UserEditScreen = () => {

    const {id} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
   


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

   
    const location = useLocation()
    const navi = useNavigate()
    
    

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navi('/admin/userlist')
        }else {
        if(!user.name || user._id !== id) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }}
      
    }, [ dispatch , user, successUpdate])
          
    

    const submitHandler = (e) => {
        e.preventDefault()
dispatch(updateUser({_id: id, name, email, isAdmin}))
      
        }

    

  return ( 
  <>
  <Link to='/admin/userlist' className='btn btn-light my-3'>
    Go Back
  </Link>
  
  <FormContainer>

    <h1>Edit User</h1>
    {loadingUpdate && <Loader/> }
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
   {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

<Form onSubmit={ submitHandler }>

<FormGroup controlId='name'>
        <FormLabel>Name </FormLabel>
        <FormControl
         type='name'
         placeholder='Enter Name'
         value={name}
         onChange={(e) => setName(e.target.value)}></FormControl>

    </FormGroup>


    <FormGroup controlId='email'>
        <FormLabel>Email Address</FormLabel>
        <FormControl
         type='email'
         placeholder='Enter Email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}></FormControl>

    </FormGroup>
      
    <FormGroup controlId='isadmin'>
      
        <FormCheck
         type='checkbox'
         label='Is Admin'
         checked={isAdmin}
         onChange={(e) => setIsAdmin(e.target.checked)}></FormCheck>

    </FormGroup>

    
    <Button type='submit' variant='primary'>
       Update
    </Button>
 
  </Form>



   )  }
   
  </FormContainer>
      
  </>
 
  )
}

export default  UserEditScreen
