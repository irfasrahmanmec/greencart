import React from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from './ProductCard';



const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>BestSeller</p>
     <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 mt-6 gap-x-4 gap-y-6'>
      {products.filter((product) => product.inStock)
        .slice(0, 8)
        .map((product) => (
          <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </div>
  );
};

export default BestSeller;