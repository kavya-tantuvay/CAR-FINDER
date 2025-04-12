import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function CarCard({ car, isInWishlist, onToggleWishlist, onViewDetails }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(car.price);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={car.image || `/api/placeholder/400/250`}
          alt={`${car.brand} ${car.model}`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        >
          <Heart 
            size={20} 
            fill={isInWishlist ? "#ef4444" : "none"} 
            color={isInWishlist ? "#ef4444" : "currentColor"} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{car.year} · {car.fuelType}</p>
          </div>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formattedPrice}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-block mr-4">
              <span className="font-medium">Engine:</span> {car.specifications?.engine}
            </span>
            <span className="inline-block">
              <span className="font-medium">Seats:</span> {car.seatingCapacity}
            </span>
          </p>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onViewDetails}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}