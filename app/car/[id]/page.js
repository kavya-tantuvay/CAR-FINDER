
'use client';

import { useParams } from 'next/navigation';
import CarDetails from '../../components/CarDetails';

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id;
  
  return <CarDetails carId={carId} />;
}