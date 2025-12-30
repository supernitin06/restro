// src/components/auth/AuthLayout.jsx
import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaShareAlt, FaGlobe, FaUtensils } from 'react-icons/fa';

const AuthLayout = ({ children, activeTab = 'login', onTabChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - EXACT as image */}
          <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-pink-100 text-white p-8 md:p-12 lg:p-16">
            <div className="h-full flex flex-col justify-center">
              
              {/* Header - EXACT as image */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold">What we offer</h1>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onTabChange('login')}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                        activeTab === 'login'
                          ? 'bg-white text-purple-600 shadow-md'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => onTabChange('signup')}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                        activeTab === 'signup'
                          ? 'bg-white text-purple-600 shadow-md'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                {/* Main Heading - EXACT as image */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Craving Something?
                </h2>
                <p className="text-2xl md:text-3xl mb-12 text-purple-100">
                  Let's get you started!
                </p>

                {/* Search Section - EXACT as image */}
                <div className="mb-12">
                  <p className="text-lg mb-4 text-purple-100">Let us know the location.</p>
                  <div className="flex bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30">
                    <div className="flex items-center px-4">
                      <FaMapMarkerAlt className="text-gray-300" />
                    </div>
                    <InputField
                      type="text" 
                      placeholder="Enter your location..." 
                      className="flex-1 bg-transparent px-4 py-4 text-white placeholder-purple-200 outline-none"
                    />
                    <button className="px-8 bg-white text-purple-600 hover:bg-purple-50 transition flex items-center font-semibold">
                      <FaSearch className="mr-2" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Features - Enhanced but similar */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Find Best Restaurants</h3>
                      <p className="text-purple-100">Discover amazing places near you</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <FaStar className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Rate & Review</h3>
                      <p className="text-purple-100">Share your dining experiences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <FaShareAlt className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Share with Friends</h3>
                      <p className="text-purple-100">Recommend your favorite spots</p>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <button className="mt-12 bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-purple-50 transition duration-300 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl">
                  <FaGlobe />
                  <span>Explore Restaurants</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Form Area */}
          <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
            <div className="max-w-md mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;