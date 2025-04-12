'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import CarCard from './components/CarCard';
import Pagination from './components/Pagination';
import WishlistPanel from './components/WishlistPanel';

export default function Home() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  });
  const [sort, setSort] = useState('price_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage on startup
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error loading wishlist:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetchCars();
  }, [filters, sort, currentPage]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.seatingCapacity) params.append('seatingCapacity', filters.seatingCapacity);
      
      params.append('sort', sort);
      params.append('page', currentPage);
      params.append('limit', 6); // Number of cars per page
      
      const response = await fetch(`/api/cars?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      
      const data = await response.json();
      setCars(data.cars);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError('Error loading cars. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const toggleWishlist = (car) => {
    setWishlist(prevWishlist => {
      // Check if car is already in wishlist
      const isInWishlist = prevWishlist.some(item => item.id === car.id);
      
      if (isInWishlist) {
        // Remove from wishlist
        return prevWishlist.filter(item => item.id !== car.id);
      } else {
        // Add to wishlist
        return [...prevWishlist, car];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header 
        onWishlistClick={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Find Your Perfect Car</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            selectedSort={sort}
          />
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex-1 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : (
            <>
              <div className="flex-1">
                {cars.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    <p className="text-xl">No cars found matching your criteria.</p>
                    <p className="mt-2">Try adjusting your filters to see more results.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map(car => (
                      <CarCard 
                        key={car.id}
                        car={car}
                        isInWishlist={wishlist.some(item => item.id === car.id)}
                        onToggleWishlist={() => toggleWishlist(car)}
                        onViewDetails={() => router.push(`/car/${car.id}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </main>
      
      <WishlistPanel 
        wishlist={wishlist}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onToggleWishlist={toggleWishlist}
        onViewDetails={(id) => router.push(`/car/${id}`)}
      />
    </div>
  );
}