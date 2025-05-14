import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Programs from './pages/programs'
import Schedule from './pages/schedule'
import Coaches from './pages/coaches'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App