import { useEffect, useState } from 'react';

export interface Product {
  id: number;
  category: string;
  itemId: string;
  namespaceId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string[];
}

const allProductsUrls = [
  '/api/phones.json',
  '/api/tablets.json',
  '/api/accessories.json',
];

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all(
      allProductsUrls.map(url => fetch(url).then(response => response.json())),
    )
      .then(productArrays => setProducts(productArrays.flat()))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, isLoading };
};
