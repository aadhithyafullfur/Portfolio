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
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Valid email is required';
    if (!form.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setStatus('');
      setSuccess(null);
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/contact';
        console.log('Sending request to:', apiUrl);
        console.log('Form data:', form);
        
        const response = await axios.post(
          apiUrl,
          form,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        console.log('Axios Response:', response);

        if (response.data.success) {
          setStatus(response.data.message);
          setSuccess(true);
          setForm({ name: '', email: '', message: '' });
          setErrors({});
        } else {
          setStatus(response.data.message || 'Error sending message');
          setSuccess(false);
        }
      } catch (error) {
        console.error('Contact form error:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setStatus(error.response.data.message);
        } else if (error.message) {
          setStatus(error.message);
        } else {
          setStatus('Error sending message. Please try again later.');
        }
        setSuccess(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
      setStatus('');
      setSuccess(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center gap-12">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="lg:w-1/2 w-full"
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
              className="w-full h-full object-cover rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-float"
            />
            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-3xl z-[-1] group-hover:opacity-50 group-hover:blur-2xl transition-all duration-300" />
          </motion.div>

          <h2 className="text-3xl font-bold text-purple-400 mb-4">Let’s Connect</h2>

          <div className="glass p-6 rounded-xl w-full max-w-md">
            <div className="flex items-center mb-4">
              <FaPhone className="text-purple-400 w-5 h-5 mr-3" />
              <p className="text-gray-200 text-md">+91 9629628246</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-purple-400 w-5 h-5 mr-3" />
              <p className="text-gray-200 text-md">aadhithyaa120@gmail.com</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-purple-400 w-5 h-5 mr-3" />
              <p className="text-gray-200 text-md">Erode, India</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Section (Form) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="lg:w-1/2 w-full"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <FaPaperPlane className="text-purple-400 text-4xl mb-2 animate-bounce" />
          <h2 className="text-3xl font-bold text-purple-400">Send a Message</h2>
        </div>

        <div className="glass p-6 rounded-xl w-full max-w-xl mx-auto">
          {status && (
            <p
              className={`text-center mb-4 ${
                success === true
                  ? 'text-green-400'
                  : success === false
                  ? 'text-red-400'
                  : ''
              }`}
            >
              {status}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 bg-black/50 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500"
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <style>{`
        .animate-float {
          animation: floatImage 4s ease-in-out infinite;
        }
        @keyframes floatImage {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Contact;
