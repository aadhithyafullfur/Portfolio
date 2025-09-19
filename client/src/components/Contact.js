import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants - optimized for performance
  const containerVariants = {
    hidden: { opacity: 0, y: 40, transform: 'translate3d(0, 40px, 0)' },
    visible: { 
      opacity: 1, 
      y: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: { 
        duration: 0.7,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, transform: 'translate3d(0, 20px, 0)' },
    visible: { 
      opacity: 1, 
      y: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: { duration: 0.5 }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(true);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/contact';
      
      // Only make API call if URL is available
      if (apiUrl !== 'http://localhost:5001/api/contact') {
        const response = await axios.post(apiUrl, form, {
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          setStatus('Message sent successfully!');
          setForm({ name: '', email: '', message: '' });
        }
      } else {
        // Fallback for local development
        setStatus('Thanks for your message! I\'ll get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-red-400 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col items-center text-center lg:text-left">
              <motion.div
                className="relative w-72 h-72 mb-6 group"
                whileHover={{ scale: 1.06, rotate: 1 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/images/bitmoji2.jpg"
                  alt="Bitmoji"
                  className="w-full h-full object-cover rounded-full border-4 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-float"
                />
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 blur-3xl z-[-1] group-hover:opacity-50 group-hover:blur-2xl transition-all duration-300" />
              </motion.div>

              <h2 className="text-3xl font-bold text-red-400 mb-4">Let's Connect</h2>

              <div className="glass p-6 rounded-xl w-full max-w-md">
                <div className="flex items-center mb-4">
                  <FaPhone className="text-red-400 w-5 h-5 mr-3" />
                  <p className="text-gray-200 text-md">+91 9629628246</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaEnvelope className="text-red-400 w-5 h-5 mr-3" />
                  <p className="text-gray-200 text-md">aadhithyaa120@gmail.com</p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-400 w-5 h-5 mr-3" />
                  <p className="text-gray-200 text-md">Erode, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="glass p-8 rounded-xl"
          >
            <div className="flex flex-col items-center mb-6">
              <FaPaperPlane className="text-red-400 text-4xl mb-2 animate-bounce" />
              <h2 className="text-3xl font-bold text-red-400">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your message"
                  required
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <p className={`text-center text-sm mt-4 ${
                  status.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;