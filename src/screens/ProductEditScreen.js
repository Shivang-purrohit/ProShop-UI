import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,  FormGroup, FormLabel, FormControl,  FormText } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { BASE_URL } from '../utils'


// Error


const ProductEditScreen = () => {

    const {id} = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)
    
   


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate

    const location = useLocation()
    const navi = useNavigate()
    
    

    useEffect(() => {
      if(successUpdate){
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navi('/admin/productlist')
      } else {

        if(!product.name || product._id !== id) {
          dispatch(listProductDetails(id))
      } else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCategory(product.category)
          setDescription(product.description)
         setCountInStock(product.countInStock)
         setBrand(product.brand)
      }

      }
       
      
    }, [ dispatch , product, successUpdate ])
          
    
    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        }
        const { data } = await axios.post(`${BASE_URL}/api/upload`, formData, config)
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
        
      }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
          _id: id,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        }))
      
        }

    

  return ( 
  <>
  <Link to='/admin/productlist' className='btn btn-light my-3'>
    Go Back
  </Link>
  
  <FormContainer>

    <h1>Edit Product</h1>

    {loadingUpdate && <Loader/>}
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


    <FormGroup controlId='price'>
        <FormLabel>Price</FormLabel>
        <FormControl
         type='number'
         placeholder='Enter Price'
         value={price}
         onChange={(e) => setPrice(e.target.value)}></FormControl>

    </FormGroup>
      
    <FormGroup controlId='image'>
      
    <FormLabel>Image</FormLabel>
        <FormControl 
         type='text'
         placeholder='Enter image url'
         value={image}
         onChange={(e) => setImage(e.target.value)}></FormControl>
        
      
        
       
 </FormGroup>
 <FormGroup>
 <FormControl type="file" 
        
         label='choose File'
         custom= 'true'
         onChange={uploadFileHandler}></FormControl>

         {uploading && <Loader /> } 
 </FormGroup>

 <FormGroup controlId='brand'>
     
 <FormLabel>Brand</FormLabel>
        <FormControl
         type='text'
         placeholder='Enter Brand '
         value={brand}
         onChange={(e) => setBrand(e.target.value)}></FormControl>

 </FormGroup>

 <FormGroup controlId='countInStock'>
     
 <FormLabel>Count In Stock</FormLabel>
        <FormControl
         type='number'
         placeholder='Enter CountInStock '
         value={countInStock}
         onChange={(e) => setCountInStock(e.target.value)}></FormControl>

 </FormGroup>

 <FormGroup controlId='category'>
     
 <FormLabel>Category</FormLabel>
        <FormControl
         type='text'
         placeholder='Enter Category '
         value={category}
         onChange={(e) => setCategory(e.target.value)}></FormControl>

 </FormGroup>

 <FormGroup controlId='description'>
     
 <FormLabel>Description</FormLabel>
        <FormControl
         type='text'
         placeholder='Enter Description '
         value={description}
         onChange={(e) => setDescription(e.target.value)}></FormControl>

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

export default  ProductEditScreen
