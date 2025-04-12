'use client';

export default function WishlistPanel({ wishlist, isOpen, onClose, onToggleWishlist, onViewDetails }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">My Wishlist</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your wishlist is empty</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Add cars to your wishlist by clicking the heart icon</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((car) => (
                <div key={car.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{car.brand} {car.model}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">${car.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => onToggleWishlist(car)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => {
                        onViewDetails(car.id);
                        onClose();
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
