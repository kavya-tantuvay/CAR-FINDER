'use client';

import { useState } from 'react';

export default function FilterPanel({ filters, onFilterChange, onSortChange, selectedSort }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
    if (window.innerWidth < 1024) {
      setIsExpanded(false);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      seatingCapacity: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">Filters</h2>
        <button 
          className="lg:hidden text-blue-600 dark:text-blue-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className={`${isExpanded ? 'block' : 'hidden'} lg:block space-y-4 mt-4`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Brand
          </label>
          <select
            name="brand"
            value={localFilters.brand}
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Maruti">Maruti</option>
            <option value="Kia">Kia</option>
            <option value="Tata">Tata</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Skoda">Skoda</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="MG">MG</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fuel Type
          </label>
          <select
            name="fuelType"
            value={localFilters.fuelType}
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Seating Capacity (Min)
          </label>
          <select
            name="seatingCapacity"
            value={localFilters.seatingCapacity}
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Any</option>
            <option value="2">2+ seats</option>
            <option value="4">4+ seats</option>
            <option value="5">5+ seats</option>
            <option value="6">6+ seats</option>
            <option value="7">7+ seats</option>
            <option value="8">8+ seats</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="year_desc">Year: Newest First</option>
          </select>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
