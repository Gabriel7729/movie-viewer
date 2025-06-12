"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/utils/animation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <footer className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700/50 section-texture">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="md:flex md:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="mb-8 md:mb-0 md:w-1/3"
            variants={itemVariants}
          >
            <Link href="/" className="flex items-center">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-8 h-8 text-primary"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 4.996 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 4.996 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-2.625-2.625c0 .621.504 1.125 1.125 1.125h1.5m-1.5 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-12.75 0v.75m12.75-3v.75m-12.75 0c.621 0 1.125.504 1.125 1.125v.75m-1.125 0c-.621 0-1.125-.504-1.125-1.125v-.75m0 0c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-.75Z" />
              </motion.svg>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MovieViewer</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore movies and discover actors in our comprehensive database. Get detailed information, ratings, and reviews for thousands of titles.
            </p>
            <div className="mt-6">
              <motion.div 
                className="bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg p-4 border border-gray-200/50 dark:border-gray-600/50"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Subscribe to our newsletter</p>
                <div className="mt-3 flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-600/70 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-r-md text-sm font-medium hover:opacity-90 transition-opacity">
                    Join
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-sm font-semibold uppercase bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Navigation</h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <motion.li variants={itemVariants}>
                  <Link href="/movies" className="hover:text-primary dark:hover:text-primary-light transition-colors">Movies</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/actors" className="hover:text-primary dark:hover:text-primary-light transition-colors">Actors</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/genres" className="hover:text-primary dark:hover:text-primary-light transition-colors">Genres</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/upcoming" className="hover:text-primary dark:hover:text-primary-light transition-colors">Upcoming</Link>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-sm font-semibold uppercase bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Account</h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <motion.li variants={itemVariants}>
                  <Link href="/auth/login" className="hover:text-primary dark:hover:text-primary-light transition-colors">Sign In</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/auth/register" className="hover:text-primary dark:hover:text-primary-light transition-colors">Sign Up</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/profile" className="hover:text-primary dark:hover:text-primary-light transition-colors">My Profile</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/watchlist" className="hover:text-primary dark:hover:text-primary-light transition-colors">My Watchlist</Link>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-sm font-semibold uppercase bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Support</h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <motion.li variants={itemVariants}>
                  <Link href="/faq" className="hover:text-primary dark:hover:text-primary-light transition-colors">FAQ</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/contact" className="hover:text-primary dark:hover:text-primary-light transition-colors">Contact Us</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/privacy" className="hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link href="/terms" className="hover:text-primary dark:hover:text-primary-light transition-colors">Terms &amp; Conditions</Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        
        <motion.div 
          className="sm:flex sm:items-center sm:justify-between"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} <Link href="/" className="hover:text-primary">MovieViewer</Link>. All Rights Reserved.
          </span>
          
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 