import React, { useEffect, useState } from 'react'

import "./LoginPage.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CompanyGlobalContext } from '../../context/CompanyContext';

const LoginPage = () => {

    const { setEntirePageLoading } = CompanyGlobalContext

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


    const loginUser= async(e)=>{
        e.preventDefault();

        if(!email){
            return setError('Please enter your email')
        }
        if(!password){
            return setError('Please enter your password')
        }

        try {
            const { data } = await axios.post('/auth/login', {
                email,
                password
                
            })  
            
            if(data){
                console.log("Logged in: ", data)
                localStorage.setItem('https://www.ecovistaportfoliomanagement.com/-token', data.token)
                // alert('Login Successful');    
                // setLoading(true)     
                // setEntirePageLoading(true) 
                navigate("/");
                window.location.reload();
            }
    
                
        } catch (error) {
            // alert(error.response.data.msg);
            setError(error.response.data.msg)
            // console.log(error.response.data.msg)  
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
                        <p className='test-account-style'><strong>TEST ACCOUNT:</strong> <br></br><strong>email: </strong> ecovista@gmail.com <strong>password: </strong>123456</p>
                        <h2>Login</h2>
                        <p>Login to your account</p>
                        
                        
                    </div>
                   
                </div>
                
                
                
                <form onSubmit={loginUser} >
                    <div className="inputs-div">
                    
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
                    <button className='tiny-head'type='submit' >LOGIN</button>
                </div>
                    
                </form>
                

                <div className="alternative-register-link text-center">
                  <p>Don't Have an Account? <Link to={"/register"} className='register-li'>Register</Link></p>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default LoginPage
