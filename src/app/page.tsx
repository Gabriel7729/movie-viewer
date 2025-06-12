import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Discover <span className="text-blue-600">Amazing</span> Movies and Actors
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Browse our extensive collection of movies and discover details about your favorite actors, all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/movies">
                  <Button size="lg">Browse Movies</Button>
                </Link>
                <Link href="/actors">
                  <Button size="lg" variant="outline">Explore Actors</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="transform -rotate-6 transition-all duration-300 hover:scale-105 hover:rotate-0">
                    <img 
                      src="https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy71SPU58RSJu.jpg" 
                      alt="Inception" 
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                  <div className="transform rotate-6 transition-all duration-300 hover:scale-105 hover:rotate-0 mt-16">
                    <img 
                      src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" 
                      alt="The Dark Knight" 
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides a comprehensive movie viewing experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 4.996 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 4.996 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-2.625-2.625c0 .621.504 1.125 1.125 1.125h1.5m-1.5 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-12.75 0v.75m12.75-3v.75m-12.75 0c.621 0 1.125.504 1.125 1.125v.75m-1.125 0c-.621 0-1.125-.504-1.125-1.125v-.75m0 0c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-.75Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Extensive Movie Database</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through our comprehensive collection of movies with detailed information.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Actor Profiles</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover detailed information about your favorite actors and their filmography.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Advanced Search</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find exactly what you're looking for with our powerful search functionality.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Featured Movies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out some of our top picks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy71SPU58RSJu.jpg" 
                alt="Inception" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Inception</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
                </p>
                <Link href="/movies/1">
                  <Button variant="outline" fullWidth>View Details</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" 
                alt="The Shawshank Redemption" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">The Shawshank Redemption</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
                </p>
                <Link href="/movies/2">
                  <Button variant="outline" fullWidth>View Details</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" 
                alt="The Dark Knight" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">The Dark Knight</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.
                </p>
                <Link href="/movies/3">
                  <Button variant="outline" fullWidth>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/movies">
              <Button>View All Movies</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Ready to explore?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join our community today and discover amazing movies and actors.
              </p>
              <Link href="/auth/register">
                <Button size="lg">Create Account</Button>
              </Link>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Already have an account?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Sign in to access your personalized movie recommendations and saved lists.
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" fullWidth>Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
