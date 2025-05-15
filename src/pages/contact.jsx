import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='min-h-full space-y-10'>  {/* Removed space-x-16 */}
      <div className='container bg-black/40 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8 shadow-lg shadow-black/20 rounded-xl'>
        {/* Left Section */}
        <section className='bg-gradient-to-b from-blue-500 via-blue-400 to-blue-100 p-8 rounded-2xl'>
          <div className='space-y-8'>
            <h1 className='text-white font-sans font-extrabold text-3xl capitalize'>Get in touch</h1>
            <div className='py-5 '>
              <h2 className='text-white font-sans font-bold text-xl' >Visite Us</h2>
              <p className='text-white font-semibold text-lg'>Haluwar tiwari tola, goplaganj, bihar
              </p>
            </div>
            <div className='py-5 '>
              <h2 className='text-white font-sans font-bold text-xl' >Chat with Us</h2>
              <p className='text-white font-semibold text-lg'>uditkumartiwari004@gmail.com
              </p>
            </div>
            <div className='py-5 '>
              <h2 className='text-white font-sans font-bold text-xl' >Call Us</h2>
              <p className='text-white font-semibold text-lg'>No: 8409024923
              </p>
            </div>
            <div className='py-5 '>
              <h2 className='text-white font-sans font-bold text-xl' >Social Media</h2>
              <p className='text-white font-semibold text-lg'>
              </p>
            </div>
          </div>
        </section>

        {/* Right Section - Form */}
        <section className='backdrop-blur-lg p-8 rounded-2xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor="firstName" className='text-white'>First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className='bg-black/30 backdrop-blur-md px-4 py-2 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500'
                  placeholder='John'
                  required 
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label htmlFor="lastName" className='text-white'>Last Name</label>
                <input 
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className='bg-black/30 backdrop-blur-md px-4 py-2 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500'
                  placeholder='Doe'
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className='flex flex-col space-y-2'>
              <label htmlFor="email" className='text-white'>Email Address</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='bg-black/30 backdrop-blur-md px-4 py-2 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500'
                placeholder='john@example.com'
                required
              />
            </div>

            {/* Message Field */}
            <div className='flex flex-col space-y-2'>
              <label htmlFor="message" className='text-white'>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className='bg-black/30 backdrop-blur-md px-4 py-2 border border-gray-500 rounded-lg text-white h-32 resize-none focus:outline-none focus:border-blue-500'
                placeholder='Your message here...'
                required
              />
            </div>

            {/* Submit Button */}
            <div className='text-center'>
              <button
                type="submit"
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 w-full md:w-auto'
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Contact