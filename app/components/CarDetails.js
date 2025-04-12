'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Heart } from 'lucide-react';

export default function CarDetails({ carId }) {
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    // Check if car is in wishlist
    const checkWishlist = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlist = JSON.parse(savedWishlist);
          setIsInWishlist(wishlist.some(item => item.id === parseInt(carId)));
        }
      } catch (e) {
        console.error('Error checking wishlist:', e);
      }
    };
    
    checkWishlist();
  }, [carId]);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        // Fetch all cars and find the one with matching ID
        // In a real app, you would have an API endpoint that returns a specific car
        const response = await fetch(`/api/cars?id=${carId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        
        const data = await response.json();
        const foundCar = data.cars.find(c => c.id === parseInt(carId));
        
        if (!foundCar) {
          throw new Error('Car not found');
        }
        
        setCar(foundCar);
        setError(null);
      } catch (err) {
        setError('Error loading car details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);
  
  const toggleWishlist = () => {
    try {
      let wishlist = [];
      const savedWishlist = localStorage.getItem('wishlist');
      
      if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
      }
      
      // Check if car is already in wishlist
      const carIndex = wishlist.findIndex(item => item.id === car.id);
      
      if (carIndex >= 0) {
        // Remove from wishlist
        wishlist.splice(carIndex, 1);
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        wishlist.push(car);
        setIsInWishlist(true);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error updating wishlist:', e);
    }
  };
  
  const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-800 dark:text-red-400">{error || 'Car not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/')}
        className="flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to Listings
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <Image
            src={car.image || `/api/placeholder/800/400`}
            alt={`${car.brand} ${car.model}`}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            <Heart 
              size={24} 
              fill={isInWishlist ? "#ef4444" : "none"} 
              color={isInWishlist ? "#ef4444" : "currentColor"} 
            />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.brand} {car.model}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{car.year}</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formattedPrice(car.price)}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Engine</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.specifications?.engine}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Transmission</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.specifications?.transmission}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Fuel Type</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.fuelType}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Mileage</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.specifications?.mileage}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Seating Capacity</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.seatingCapacity} seats</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Color</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.specifications?.color}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleWishlist()}
                className={`inline-flex items-center px-4 py-2 border ${
                  isInWishlist 
                    ? 'border-gray-300 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800' 
                    : 'border-transparent text-white bg-red-600 dark:bg-red-700'
                } rounded-md text-sm font-medium shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              >
                <Heart 
                  size={20} 
                  className="mr-2" 
                  fill={isInWishlist ? "#ef4444" : "none"} 
                  color={isInWishlist ? "#ef4444" : "white"} 
                />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}