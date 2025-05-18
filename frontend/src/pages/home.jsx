import React from 'react'
import { useNavigate } from 'react-router-dom' 
import Button from '../components/Button'
// import { useAuth } from '../context/authContext';


const features = [
  {
    id: 1,
    title: "Professional Coaches",
    description: "Learn from certified national and international level coaches",
    icon: "🏆"
  },
  {
    id: 2,
    title: "Modern Facilities",
    description: "6 professional courts with synthetic flooring and proper lighting",
    icon: "🏸"
  },
  {
    id: 3,
    title: "Flexible Schedule",
    description: "Morning and evening batches available 7 days a week",
    icon: "⏰"
  }
]


const programs = [
  {
    id: 1,
    title: "Beginner's Program",
    duration: "3 months",
    price: "₹3000/month",
    features: [
      "Basic techniques and footwork",
      "Introduction to game rules",
      "Fitness conditioning"
    ]
  },
  {
    id: 2,
    title: "Intermediate Training",
    duration: "6 months",
    price: "₹4500/month",
    features: [
      "Advanced shot techniques",
      "Match strategies",
      "Personal coaching"
    ]
  },
  {
    id: 3,
    title: "Professional Course",
    duration: "12 months",
    price: "₹6000/month",
    features: [
      "Tournament preparation",
      "Advanced game analysis",
      "One-on-one mentoring"
    ]
  }
]
const Home = () => {

    const navigate = useNavigate();
    
    return (
      <div className="min-h-screen space-y-20">
        {/* Hero section */}
        {/* <section className="relative h-[80vh]">
          {" "}
          {/* Fixed height 
          <div
            className='absolute inset-0 w-full h-full before:content-[""] before:absolute before:inset-0 before:bg-black/50'
            style={{
              backgroundImage: "url('/images/court-image.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
            }}
          ></div>
          <div className="relative z-10 container mx-auto px-4 flex h-full">
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-5xl md:text-6xl font-bold text-amber-500 mb-6">
                Welcome to Badminton Academy
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-center">
                Train with professional coaches and unlock your potential
              </p>
              {user ? (
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate("/programs")}
                >
                  Explore Programs
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate("/SignUp")}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </section> */}

        {/* hero section */}
        <section className="relative h-[85vh] overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/70 before:via-purple-900/50 before:to-black/70"
            style={{
              backgroundImage: "url('/images/court-image.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // Parallax effect
              height: "100%",
            }}
          >
            {/* Animated overlay pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] animate-pulse"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300 mb-6 animate-fade-in-down">
              Welcome to Badminton Academy
              </h1>

              <div className="overflow-hidden">
                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed animate-fade-in-up">
                  Train with professional coaches and unlock your potential
              
                </p>
              </div>

              <div className="animate-fade-in">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate("/programs")}
                  className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/20"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-1 h-16 rounded-full bg-gradient-to-b from-amber-500 to-transparent"></div>
          </div>
        </section>

        {/* feature section */}
        <section className="py-20 mx-4 bg-black/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-amber-500">
              Why choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-black/30 p-6 rounded-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <div className="text-xl font-bold mb-2 text-fuchsia-500">
                    {feature.title}
                  </div>
                  <div className="text-gray-300">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* programs section */}
        <section className="py-20 mx-4 bg-amber-800/20 backdrop-blur-3xl">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-amber-500 mb-12">
              Our Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-black/30 p-6 rounded-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-amber-500">
                    {program.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Duration: {program.duration}
                  </p>
                  <p className="text-2xl font-bold text-amber-500 mb-4">
                    {program.price}
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* <div className='text-center justify-center justify-items-center'>
                    <h3 className='text-3xl py-6 font-bold text-center justify-center text-blue-300'>Find more...</h3>
                    <button onClick={() => navigate('/programs')} className='px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-lg hover:shadow-amber-500/20'>Programs</button>
                    </div> */}
          </div>
        </section>
      </div>
    );
}

export default Home