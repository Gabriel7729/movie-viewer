"use client";

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slideUp, slideInLeft, slideInRight, staggerContainer } from '@/utils/animation';
import AnimateElement from '@/components/ui/AnimateElement';
import ParallaxScroll, { ParallaxSection } from '@/components/animation/ParallaxScroll';
import { useEffect, useState } from 'react';
import { Movie } from '@/types';
import { useMovies } from '@/services/hooks';

export default function Home() {
  const { data: moviesResponse } = useMovies();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (moviesResponse && moviesResponse.data) {
      setAllMovies(moviesResponse.data);
    }
  }, [moviesResponse]);
  
  // Get first two movies for the hero section
  const heroMovies = allMovies.slice(0, 2);
  
  // Get the next three movies for the featured section
  const featuredMovies = allMovies.slice(0, 3);
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Discover <motion.span 
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-extrabold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >Amazing</motion.span> Movies and Actors
              </h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Browse our extensive collection of movies and discover details about your favorite actors, all in one place.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="/movies">
                  <Button size="lg">Browse Movies</Button>
                </Link>
                <Link href="/actors">
                  <Button size="lg" variant="outline">Explore Actors</Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {heroMovies.length > 0 ? (
                    <>
                      <ParallaxScroll direction="left" speed={0.2}>
                        <motion.div 
                          className="transform -rotate-6"
                          whileHover={{ scale: 1.05, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative w-full aspect-[2/3] rounded-lg shadow-xl overflow-hidden">
                            <Image 
                              src={heroMovies[0]?.image || "https://via.placeholder.com/500x750?text=Movie+Poster"} 
                              alt={heroMovies[0]?.title || "Movie poster"} 
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      </ParallaxScroll>
                      
                      {heroMovies.length > 1 && (
                        <ParallaxScroll direction="right" speed={0.3}>
                          <motion.div 
                            className="transform rotate-6 mt-16"
                            whileHover={{ scale: 1.05, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative w-full aspect-[2/3] rounded-lg shadow-xl overflow-hidden">
                              <Image 
                                src={heroMovies[1]?.image || "https://via.placeholder.com/500x750?text=Movie+Poster"} 
                                alt={heroMovies[1]?.title || "Movie poster"} 
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover"
                              />
                            </div>
                          </motion.div>
                        </ParallaxScroll>
                      )}
                    </>
                  ) : (
                    <>
                      <ParallaxScroll direction="left" speed={0.2}>
                        <motion.div 
                          className="transform -rotate-6"
                          whileHover={{ scale: 1.05, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative w-full aspect-[2/3] rounded-lg shadow-xl overflow-hidden">
                            <Image 
                              src="https://via.placeholder.com/500x750?text=Loading" 
                              alt="Loading" 
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      </ParallaxScroll>
                      
                      <ParallaxScroll direction="right" speed={0.3}>
                        <motion.div 
                          className="transform rotate-6 mt-16"
                          whileHover={{ scale: 1.05, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative w-full aspect-[2/3] rounded-lg shadow-xl overflow-hidden">
                            <Image 
                              src="https://via.placeholder.com/500x750?text=Loading" 
                              alt="Loading" 
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      </ParallaxScroll>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <ParallaxSection className="py-16 bg-blue-50 dark:bg-gray-800 section-texture">
        <div className="container mx-auto px-4">
          <AnimateElement variants={slideUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Key Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform provides a comprehensive movie viewing experience
              </p>
            </div>
          </AnimateElement>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <AnimateElement delay={0.1}>
              <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md p-6 rounded-lg shadow-md text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-light/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light rounded-full mb-6"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 4.996 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 4.996 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-2.625-2.625c0 .621.504 1.125 1.125 1.125h1.5m-1.5 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-12.75 0v.75m12.75-3v.75m-12.75 0c.621 0 1.125.504 1.125 1.125v.75m-1.125 0c-.621 0-1.125-.504-1.125-1.125v-.75m0 0c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-.75Z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Extensive Movie Database</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse through our comprehensive collection of movies with detailed information.
                </p>
              </div>
            </AnimateElement>
            
            <AnimateElement delay={0.2}>
              <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md p-6 rounded-lg shadow-md text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-accent-light/10 dark:bg-accent/20 text-accent dark:text-accent-light rounded-full mb-6"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Actor Profiles</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover detailed information about your favorite actors and their filmography.
                </p>
              </div>
            </AnimateElement>
            
            <AnimateElement delay={0.3}>
              <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md p-6 rounded-lg shadow-md text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-secondary-light/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light rounded-full mb-6"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Advanced Search</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Find exactly what you&apos;re looking for with our powerful search functionality.
                </p>
              </div>
            </AnimateElement>
          </motion.div>
        </div>
      </ParallaxSection>
      
      <ParallaxSection className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <AnimateElement variants={slideUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Featured Movies</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Check out some of our top picks
              </p>
            </div>
          </AnimateElement>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredMovies.length > 0 ? (
              featuredMovies.map((movie, index) => (
                <AnimateElement delay={0.1 * (index + 1)} key={movie.id}>
                  <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <div className="relative w-full h-64">
                        <Image 
                          src={movie.image || "https://via.placeholder.com/500x750?text=No+Image"} 
                          alt={movie.title} 
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          style={{ transform: 'scale(1.05)' }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 dark:text-white mb-2"
                          variants={titleVariants}
                        >
                          {movie.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                          variants={paragraphVariants}
                        >
                          {movie.description}
                        </motion.p>
                        <motion.div variants={buttonVariants}>
                          <Link href={`/movies/${movie.id}`}>
                            <Button variant="outline" fullWidth>View Details</Button>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </AnimateElement>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, index) => (
                <AnimateElement delay={0.1 * (index + 1)} key={index}>
                  <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                        <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-4"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                      </div>
                    </motion.div>
                  </div>
                </AnimateElement>
              ))
            )}
          </motion.div>
          
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/movies">
              <Button>View All Movies</Button>
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>
      
      <ParallaxSection className="py-16 bg-blue-50 dark:bg-gray-800 border-t border-b border-gray-200/30 dark:border-gray-700/30 section-texture">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">explore</span>?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Join our community today and discover amazing movies and actors.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/auth/register">
                  <Button size="lg">Create Account</Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/3"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-md p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-xl font-bold text-gray-800 dark:text-white mb-4"
                  variants={titleVariants}
                >
                  Already have an account?
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6"
                  variants={paragraphVariants}
                >
                  Sign in to access your personalized movie recommendations and saved lists.
                </motion.p>
                <motion.div variants={buttonVariants}>
                  <Link href="/auth/login">
                    <Button variant="outline" fullWidth>Sign In</Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>
    </motion.div>
  );
}
