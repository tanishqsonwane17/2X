import React from 'react'
import axios from 'axios'
import { useState } from 'react'
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/users/register',formData, {
        withCredentials: true,
        })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-[30vw] border rounded-2xl p-8'>
        <h1 className='text-center text-2xl font-semibold'>Register</h1>

        <form 
          onSubmit={handleSubmit} 
          className='flex flex-col gap-4 px-10 mt-4'
        >
          <input type="text" value={formData.username} onChange={handleChange} name='username' placeholder='Enter your username' className='border px-4 py-2 rounded-xl'/>
          <input type='email' value={formData.email} onChange={handleChange} name='email' placeholder='Enter your Email' className='border px-4 py-2 rounded-xl'/>
          <input type='password' value={formData.password} onChange={handleChange} name='password' placeholder='Enter your Password' className='border px-4 py-2 rounded-xl'/>
          <input type="number" value={formData.phone} onChange={handleChange} name='phone' placeholder='Enter your Phone' className='border px-4 py-2 rounded-xl'/>

          <button 
            type="submit" 
            className='border bg-blue-400 text-white cursor-pointer px-4 py-2 rounded-xl'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
