'use client'
import React, { useState } from 'react';
import Link from 'next/link';
const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(name,email,password);
    }
    return (
        <div className='main'>
            <div className='form-box'>
                <div className='form-heading'>
                <p >Signup</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor='name'>Name</label>
                    <br></br>
                    <input type='text' name='name' id='name' className='input' onChange={(e)=>setName(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <div>
                    <label htmlFor='email'>Email</label>
                    <br></br>
                    <input type='email' name='email' id='email' className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <div>
                    <label htmlFor='password'>Password</label>
                    <br></br>
                    <input type='password' name='password' id='password' className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
                    </div>
                    <br></br>
                    <div className='btn-div'>
                    <button className='form-btn' type='submit'>Signup</button>
                    </div>
                </form>
                <br/>
                <hr></hr>
                <div className='form-bottom'>
                <p>Already have an account?</p>
                <Link href='/' className='form-anchor'>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
