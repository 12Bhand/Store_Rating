import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-300 opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-sky-300 opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <main className="mt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-400 rounded-full opacity-50 animate-pulse delay-700"></div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                  <div className="grid gap-6">
                    <div className="bg-white/20 p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-white"
                          >
                            <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-white">Rate Stores</h3>
                          <p className="text-teal-100">Share your experiences</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-8 w-8 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/20 p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-white"
                          >
                            <path d="M3 3v18h18" />
                            <path d="m19 9-5 5-4-4-3 3" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-white">Track Ratings</h3>
                          <p className="text-teal-100">Monitor your store performance</p>
                        </div>
                      </div>
                      <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 w-4/5 rounded-full"></div>
                      </div>
                      <div className="mt-2 text-right text-white font-medium">4.8/5.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Discover and Rate Your Favorite Stores
              </h2>
              <p className="mt-6 text-xl text-teal-50">
                Join our community to share your experiences and help others find the best stores around.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl">
                    Get Started
                  </Button>
                </Link>
                <Link href="/stores">
                  <Button className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 rounded-xl">
                    Browse Stores
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <header className="flex justify-between items-center py-6 mt-16">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-teal-600"
              >
                <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-white">StoreApp</h1>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="bg-white text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-300">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-teal-800 text-white hover:bg-teal-900 transition-all duration-300">Sign Up</Button>
            </Link>
          </div>
        </header>

        <footer className="mt-32 py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-teal-600"
                >
                  <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">StoreApp</h1>
            </div>
            <div className="mt-4 md:mt-0 text-teal-100">
              &copy; {new Date().getFullYear()} StoreApp. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
