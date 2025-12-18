import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: window.innerWidth <= 768 ? 30 : 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: window.innerWidth <= 768 ? 0.6 : 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: window.innerWidth <= 768 ? 20 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: window.innerWidth <= 768 ? 0.5 : 0.6 }
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
    <section id="contact" className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: window.innerWidth <= 768 ? 0.2 : 0.3 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center px-2"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-2 md:mb-3 leading-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Touch</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project or opportunity? I'd love to hear from you. Let's connect and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Bitmoji Image */}
            <motion.div
              className="relative mx-auto lg:mx-0 w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/images/bitmoji2.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl border-2 border-white/20 shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>

            <div className="bg-black/40 rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5 md:mb-6">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaPhone className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium">Phone</p>
                    <p className="text-white text-sm sm:text-base font-semibold">+91 9629628246</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaEnvelope className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium">Email</p>
                    <p className="text-white text-sm sm:text-base font-semibold">aadhithyaa120@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium">Location</p>
                    <p className="text-white text-sm sm:text-base font-semibold">Erode, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-black/40 rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
              <p className="text-gray-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">Follow Me</p>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { icon: FaGithub, label: 'GitHub', url: 'https://github.com/aadhithyafullfur' },
                  { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/aadhithyaa' },
                  { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com' },
                ].map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-400/50 flex items-center justify-center text-purple-300 transition-all duration-300 hover:scale-110 active:scale-95"
                    title={label}
                  >
                    <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-black/40 rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6 md:p-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Send Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-black/40 text-white border border-purple-500/20 rounded-lg focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all backdrop-blur-sm"
                  placeholder="Your name"
                  required
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-black/40 text-white border border-purple-500/20 rounded-lg focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all backdrop-blur-sm"
                  placeholder="your@email.com"
                  required
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-black/40 text-white border border-purple-500/20 rounded-lg focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all resize-none backdrop-blur-sm"
                  placeholder="Your message here..."
                  required
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/90 hover:to-purple-400/90 active:from-amber-700/90 active:to-purple-600/90 text-white font-semibold py-2.5 sm:py-3 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-sm sm:text-base"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <p className={`text-xs sm:text-sm text-center p-2 rounded-lg ${
                  status.includes('successfully') 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
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
