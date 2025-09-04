import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCards from '../../Components/Products/ProductCards';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // ?query=iphone
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/get-products?search=${query}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCards key={product._id} product={product}></ProductCards>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Search;
