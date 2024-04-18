import React, { useEffect, useState } from 'react'

import "./RegisterPage.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const RegisterPage = () => {
    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const [error, setError] = useState('')

    useEffect(()=>{
        // console.log(error)

        setTimeout(() => {
            setError('')
        }, 3000);
    },[error])


    const registerUser= async(e)=>{
        e.preventDefault();

        if(!name){
            return setError('Please enter your name')
        }
        if(!email){
            return setError('Please enter your email')
        }
        if(!password){
            return setError('Please set your password')
        }

        
        try {
            const { data } = await axios.post('/auth/register', {
              name,
              email,
              password
            })  
            
            // console.log(registered);
            
            
            if(data){
              localStorage.setItem('https://www.ecovistaportfoliomanagement.com/-token', data.token)          
            //   console.log(data)
                navigate("/");
              window.location.reload();
            }
            
        } catch (error) {
            // alert(error.response.data.msg);
            setError(error.response.data.msg)
            console.log(error)
            
        }



    }
  return (
    <div className='add-stock-component login-page'>
        <div className="add-stock-modal">
            <div className="add-stock-modal-div">
                    {       
                        error && (
                            <p className='error-text'>{error}</p>
                        )
                    }
                
                
                <div className='add-stock-head'>
                    
                    
                    <div >

                        <h2>Register</h2>
                        <p>Register an account</p>
                    </div>
                   
                </div>
                
                
                
                <form onSubmit={registerUser} >
                <div className="inputs-div">
                   
                   <input 
                       type="text" 
                       placeholder='Name e.g. Peterson Mina' 
                       value={name}
                       onChange={(e)=>{setName(e.target.value)}}
                       
                   />
                   <input 
                       type="email" 
                       placeholder='your@email.com' 
                       value={email}
                       onChange={(e)=>{setEmail(e.target.value)}}
                   />
                   <input 
                       type="password" 
                       placeholder='password' 
                       value={password}
                       onChange={(e)=>{setPassword(e.target.value)}}
                       
                   />
                   
               </div>

               <div className="add-stock-btn">
                   <button className='tiny-head' type='submit' >REGISTER</button>
               </div>

                </form>
               

                <div className="alternative-register-link text-center">
                  <p>Have an account? <Link to={"/login"} className='register-li'>Login</Link></p>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default RegisterPage
