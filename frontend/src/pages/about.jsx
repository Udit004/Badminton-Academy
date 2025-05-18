import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🏆", // You can replace with actual icon component or image
      title: "Expert Coaches",
      description:
        "Our coaches are former national team members and world-class players. They bring a wealth of experience and expertise to our training programs.",
      highlight:
        "Our coaches are former national team members and world-class players. They bring a wealth of experience and expertise to our training programs.",
    },
    {
      icon: "📍", // You can replace with actual icon component or image
      title: "Prime Location",
      description:
        "We are located in the heart of the San Francisco Bay Area, one of the most vibrant and diverse regions in the country. Our central location makes it easy for students to access our training facilities.",
      highlight:
        "We are located in the heart of the San Francisco Bay Area, one of the most vibrant and diverse regions in the country. Our central location makes it easy for students to access our training facilities.",
    },
    {
      icon: "👥", // You can replace with actual icon component or image
      title: "USAB Certified",
      description:
        "Our academy is the only USAB-certified national training center on the West Coast. This prestigious designation reflects our commitment to excellence in coaching and training.",
      highlight:
        "Our academy is the only USAB-certified national training center on the West Coast. This prestigious designation reflects our commitment to excellence in coaching and training.",
    },
  ];

  return (
    <div className="min-h-screen space-y-20">
      {/* hero section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/70 before:via-purple-900/50 before:to-black/70"
          style={{
            backgroundImage: "url('/images/aboutPage.jpg')",
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
              The Champion's Academy
            </h1>

            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed animate-fade-in-up">
                Where champions are made. We are the premier badminton training
                academy in Patna, dedicated to nurturing talent and fostering
                excellence.
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

      {/* mission section */}
      <section className="py-12 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50 shadow-2xl border border-purple-500/10 rounded-3xl mx-4">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl text-amber-500 font-bold mb-12">Our Mission</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Badminton is a game of precision, skill, and strategy. We believe
                that our students should have the best possible environment to
                learn and grow. Our mission is to provide the highest quality
                coaching and training facilities to our students. We are committed
                to helping them achieve their full potential as athletes and
                individuals.
              </p>
              <p className="text-white text-xl font-semibold leading-relaxed bg-gradient-to-r from-amber-500/20 to-transparent p-6 rounded-lg border-l-4 border-amber-500">
                Our mission is to provide the highest quality coaching and
                training facilities to our students. We are committed to helping
                them achieve their full potential as athletes and individuals.
              </p>
            </div>

            <div className="lg:col-span-1">
              <img
                src="./images/missionImg.png"
                alt="Mission illustration"
                className="w-full h-auto rounded-2xl shadow-xl border-2 border-purple-400/20 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different section */}
      <section className="py-12 bg-gradient-to-br from-black/50 via-purple-900/30 to-black/50 shadow-lg border border-purple-500/10 rounded-2xl mx-4">
        <div className="text-center mb-12">
          <h3 className="text-4xl text-amber-500 font-bold">
            What Makes Us Different
          </h3>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl
                          shadow-lg hover:shadow-purple-500/10 hover:scale-105 
                          transition-all duration-300 ease-out"
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold text-amber-500 mb-4 text-center">
                  {feature.title}
                </h4>
                <p className="text-gray-300 mb-4 text-center leading-relaxed">
                  {feature.description}
                </p>
                <div className="w-16 h-0.5 bg-amber-500/50 my-4"></div>
                <p className="text-gray-200 font-medium text-center italic">
                  {feature.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
