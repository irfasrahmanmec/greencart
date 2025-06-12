import React from 'react'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/appcontext';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { categories } = useParams();

    const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === categories.toLowerCase()
    );

    return (
        <div className='mt-16'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>{categories.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'> </div>
            </div>
            {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div>No products found</div>
            )}
        </div>
    )
}

export default ProductCategory