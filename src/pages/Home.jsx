import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Clock, 
  Star, 
  Users, 
  Award,
  ArrowRight 
} from 'lucide-react';

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE || "./src/assets/";

const Home = () => {
  
  const services = [
    { name: "RCT", img: `${IMAGE_BASE_URL}toothrct.jpg` },
    { name: "Episectomy", img: `${IMAGE_BASE_URL}toothepisectomy.jpg` },
    { name: "Scaling", img: `${IMAGE_BASE_URL}toothscaling.jpg` },
    { name: "Cavity Filling", img: `${IMAGE_BASE_URL}toothcavityfilling.png` },
    { name: "Orthodontic Treatment", img: `${IMAGE_BASE_URL}toothorthodontic.jpg` },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--txt)]">
      <Header />

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 pt-16 md:pt-20"> <div className="md:w-1/2 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">Welcome to OJAS Dental Clinic</h1>
          <p className="text-xl md:text-2xl text-gray-600 py-4">Providing quality care for your smile</p>
          <Link to="/appointment" className="inline-block mt-4 bg-[var(--darkgreen)] text-white px-6 py-3 rounded-full hover:bg-[var(--darkergreen)] transition-colors duration-300">
            Book an Appointment
          </Link>
        </div>
        <img 
          src={`${IMAGE_BASE_URL}dentist.jpg`} 
          alt="Dentist" 
          className="md:w-1/2 h-auto rounded-lg mt-8 md:mt-0 shadow-lg transform hover:scale-105 transition-transform duration-300" 
        /> 
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <Feature 
              icon={<Shield className="w-8 h-8 text-[var(--darkgreen)]" />}
              title="Expert Care"
              description="Advanced treatments with the latest dental technology"
            />
            <Feature 
              icon={<Clock className="w-8 h-8 text-[var(--darkgreen)]" />}
              title="Convenient Hours"
              description="Open from 9:00 AM to 7:00 PM daily"
            />
            <Feature 
              icon={<Star className="w-8 h-8 text-[var(--darkgreen)]" />}
              title="Quality Service"
              description="Dedicated to your dental health"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--bg)] to-[var(--lightgreen)]">
            <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
            <div className="flex justify-between items-center my-14 px-10">
        
            {[
              { name: "RCT", img: `${IMAGE_BASE_URL}toothrct.jpg` },
              { name: "Episectomy", img: `${IMAGE_BASE_URL}toothepisectomy.jpg` },
              { name: "Scaling", img: `${IMAGE_BASE_URL}toothscaling.jpg` },
              { name: "Cavity Filling", img: `${IMAGE_BASE_URL}toothcavityfilling.png` },
              { name: "Orthodontic Treatment", img: `${IMAGE_BASE_URL}toothorthodontic.jpg` },
            ].map((feature, index) => (
              <div key={index} className="relative group p-5 ">
            {/* Feature Circle */}
            <div className="w-52 h-52  flex items-center justify-center bg-[var(--darkgreen)] text-white text-lg font-bold rounded-full shadow-md transition-all duration-300 group-hover:w-60 group-hover:h-60 group-hover:bg-[var(--darkergreen)]">
              {feature.name}
            </div>

            

            {/* Hover Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <img
                src={feature.img}
                alt={feature.name}
                className="w-60 h-60 rounded-full border-2 border-[var(--darkergreen)] shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
      </section>

      {/* Clinic Location */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Clinic's Location</h2>
              <p className="text-gray-600 font-bold text-lg mb-4">OJAS Dental Clinic, Baran, Rajasthan. 325205.</p>
              <p className="text-gray-600">Find us easily on the map below.</p>
            </div>
            <div className="md:w-1/2">
              <a href="https://mapcarta.com/N7690809383" target="_blank" rel="noopener noreferrer">
                <img 
                  src={`${IMAGE_BASE_URL}maps.png`} 
                  alt="Clinic Map" 
                  className="rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300 w-full"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Info & Hours */}
      <section className="py-20 bg-[var(--lightgreen)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Meet Our Doctor</h2>
              <h3 className="text-2xl font-semibold mb-4">Dr. Gupta</h3>
              <p className="text-gray-600 mb-8">Experienced professional dedicated to your dental health.</p>
              <TeamFeature icon={<Users className="w-6 h-6 text-[var(--darkgreen)]" />} text="Experienced Specialist" />
              <TeamFeature icon={<Award className="w-6 h-6 text-[var(--darkgreen)]" />} text="Certified Professional" />
            </div>
            <div className="md:w-1/2 text-center md:text-right">
              <h2 className="text-3xl font-bold mb-6">Working Hours</h2>
              <p className="text-gray-600 font-bold text-lg">9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Certifications */}
      <section className="py-20 bg-[var(--bg)] text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Doctor's Certifications</h2>
          <img 
            src={`${IMAGE_BASE_URL}clinicLogo.png`} 
            alt="Doctor's Certification" 
            className="mx-auto my-4 max-w-xs rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-[var(--lightgreen)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <ContactInfo 
              icon={<Phone className="w-8 h-8 mx-auto mb-4 text-[var(--darkgreen)]" />}
              title="Call Us"
              info="+123 456 7890"
            />
            <ContactInfo 
              icon={<Mail className="w-8 h-8 mx-auto mb-4 text-[var(--darkgreen)]" />}
              title="Email Us"
              info="example@clinic.com"
            />
            <ContactInfo 
              icon={<MapPin className="w-8 h-8 mx-auto mb-4 text-[var(--darkgreen)]" />}
              title="Visit Us"
              info="OJAS Dental Clinic, Baran, Rajasthan. 325205"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--darkgreen)] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">OJAS Dental Clinic</h2>
          <p className="text-gray-200 mb-6">Providing quality dental care in Baran, Rajasthan</p>
          <nav className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--lightgreen)] transition-colors">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--lightgreen)] transition-colors">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--lightgreen)] transition-colors">Instagram</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

// Reusable Components
function Feature({ icon, title, description }) {
  return (
    <div className="text-center">
      <div className="bg-[var(--lightgreen)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TeamFeature({ icon, text }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <span className="text-lg">{text}</span>
    </div>
  );
}

function ContactInfo({ icon, title, info }) {
  return (
    <div className="text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{info}</p>
    </div>
  );
}

export default Home;
