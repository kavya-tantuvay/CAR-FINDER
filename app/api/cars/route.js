import { NextResponse } from 'next/server';

const carsData = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    price: 30000,
    image: "/images/toyota-camry.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2023,
    description: "Spacious hybrid sedan with premium features.",
    specifications: {
      engine: "2.5L Hybrid",
      mileage: "22 kmpl",
      color: "White",
      transmission: "Automatic"
    }
  },
  {
    id: 2,
    brand: "Honda",
    model: "City",
    price: 16000,
    image: "/images/honda-city.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2022,
    description: "Reliable and efficient mid-size sedan.",
    specifications: {
      engine: "1.5L i-VTEC",
      mileage: "17 kmpl",
      color: "Red",
      transmission: "Manual"
    }
  },
  {
    id: 3,
    brand: "Hyundai",
    model: "Creta",
    price: 20000,
    image: "/images/hyundai-creta.jpg",
    fuelType: "Diesel",
    seatingCapacity: 5,
    year: 2023,
    description: "Stylish compact SUV for urban driving.",
    specifications: {
      engine: "1.6L CRDi",
      mileage: "20 kmpl",
      color: "Silver",
      transmission: "Automatic"
    }
  },
  {
    id: 4,
    brand: "Maruti",
    model: "Swift",
    price: 12000,
    image: "/images/maruti-swift.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2021,
    description: "Budget-friendly hatchback with great mileage.",
    specifications: {
      engine: "1.2L DualJet",
      mileage: "23 kmpl",
      color: "Blue",
      transmission: "Manual"
    }
  },
  {
    id: 5,
    brand: "Kia",
    model: "Seltos",
    price: 22000,
    image: "/images/kia-seltos.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2022,
    description: "Sporty SUV with premium interior.",
    specifications: {
      engine: "1.5L Smartstream",
      mileage: "18 kmpl",
      color: "Black",
      transmission: "Automatic"
    }
  },
  {
    id: 6,
    brand: "Tata",
    model: "Nexon",
    price: 18000,
    image: "/images/tata-nexon.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2023,
    description: "India's safest compact SUV.",
    specifications: {
      engine: "1.2L Turbo",
      mileage: "17 kmpl",
      color: "Grey",
      transmission: "AMT"
    }
  },
  {
    id: 7,
    brand: "Mahindra",
    model: "Thar",
    price: 25000,
    image: "/images/mahindra-thar.jpg",
    fuelType: "Diesel",
    seatingCapacity: 4,
    year: 2023,
    description: "Rugged off-roader made for adventure.",
    specifications: {
      engine: "2.2L mHawk",
      mileage: "15 kmpl",
      color: "Green",
      transmission: "Manual"
    }
  },
  {
    id: 8,
    brand: "Skoda",
    model: "Slavia",
    price: 21000,
    image: "/images/skoda-slavia.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2022,
    description: "European-styled premium sedan.",
    specifications: {
      engine: "1.0L TSI",
      mileage: "19 kmpl",
      color: "Silver",
      transmission: "Manual"
    }
  },
  {
    id: 9,
    brand: "Volkswagen",
    model: "Virtus",
    price: 22000,
    image: "/images/volkswagen-virtus.jpg",
    fuelType: "Petrol",
    seatingCapacity: 5,
    year: 2022,
    description: "German engineering in a stylish body.",
    specifications: {
      engine: "1.0L TSI",
      mileage: "18.5 kmpl",
      color: "Yellow",
      transmission: "Automatic"
    }
  },
  {
    id: 10,
    brand: "MG",
    model: "Hector",
    price: 24000,
    image: "/images/mg-hector.jpg",
    fuelType: "Diesel",
    seatingCapacity: 5,
    year: 2023,
    description: "Bold and connected SUV for families.",
    specifications: {
      engine: "2.0L Diesel",
      mileage: "17 kmpl",
      color: "White",
      transmission: "Manual"
    }
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const fuelType = searchParams.get('fuelType');
  const seatingCapacity = searchParams.get('seatingCapacity');
  const sort = searchParams.get('sort') || 'price_asc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (id) {
    const car = carsData.find(c => c.id === parseInt(id));
    return NextResponse.json({ cars: car ? [car] : [] });
  }

  let filtered = [...carsData];

  if (brand) {
    filtered = filtered.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
  }

  if (minPrice) {
    filtered = filtered.filter(car => car.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(car => car.price <= parseInt(maxPrice));
  }

  if (fuelType) {
    filtered = filtered.filter(car => car.fuelType.toLowerCase() === fuelType.toLowerCase());
  }

  if (seatingCapacity) {
    filtered = filtered.filter(car => car.seatingCapacity >= parseInt(seatingCapacity));
  }

  switch (sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'year_desc':
      filtered.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }

  const totalCars = filtered.length;
  const totalPages = Math.ceil(totalCars / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCars = filtered.slice(startIndex, startIndex + limit);

  await new Promise(res => setTimeout(res, 500)); // simulate delay

  return NextResponse.json({
    cars: paginatedCars,
    totalCars,
    totalPages,
    currentPage: page
  });
}
