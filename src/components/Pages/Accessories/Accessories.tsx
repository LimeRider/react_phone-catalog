import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import style from './Accessories.module.scss';
import { CustomSelect, SelectOption } from '../SelectOption';
import { useCart } from '../../CartContext/CartContext';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string;
  namespaceId: string;
}

const sortOptions: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const pageSizeOptions: SelectOption[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const Accessories: React.FC = () => {
  const [sortBy, setSortBy] = useState<SelectOption>(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<SelectOption>(pageSizeOptions[2]);
  const [products, setProducts] = useState<Product[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const { cartIds, likedIds, toggleCart, toggleLike } = useCart();

  useEffect(() => {
    fetch('/api/accessories.json')
      .then(response => response.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy.value) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;

      case 'newest':
      default:
        sorted.sort((a, b) => b.year - a.year);
        break;
    }

    return sorted;
  }, [products, sortBy]);

  const perPage =
    pageSize.value === 'all' ? sortedProducts.length : Number(pageSize.value);

  const totalPages =
    pageSize.value === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

  const visibleProducts = useMemo(() => {
    if (pageSize.value === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, pageSize, currentPage, perPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevPage = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  };

  return (
    <main>
      <div className={style.accessoriess}>
        <div className={style.home}>
          <Link to="/">
            <img className={style.linkImg} src="/img/Home.png" alt="Home" />
          </Link>
          <p className={style.linkText}>&#707;</p>
          <p className={style.linkText}>Accessories</p>
        </div>

        <h1 className={style.accessoriessTitle}>Accessories</h1>
        <p className={style.accessoriessModel}>{products.length} models</p>

        <div className={style.accessoriesSort}>
          <div className={style.accessoriesSortBy}>
            <p className={style.sortName}>Sort by</p>
            <CustomSelect
              className={style.selectForm}
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>

          <div className={style.accessoriesPage}>
            <p className={style.sortName}>Items on page</p>
            <CustomSelect
              className={style.selectFormPage}
              value={pageSize}
              onChange={setPageSize}
              options={pageSizeOptions}
            />
          </div>
        </div>
        <ul className={style.list} ref={listRef}>
          {visibleProducts.map(product => (
            <li className={style.item} key={product.id}>
              <Link className={style.Link} to={`/product/${product.id}`}>
                <img
                  className={style.imgaccessories}
                  src={product.images[1]}
                  alt={product.name}
                />
              </Link>
              <Link className={style.Link} to={`/product/${product.id}`}>
                {' '}
                <p className={style.name}>{product.name}</p>
              </Link>
              <p className={style.price}>
                ${product.priceDiscount}{' '}
                <span className={style.fullprice}>${product.priceRegular}</span>
              </p>
              <div className={style.characteristics}>
                <div className={style.characteristic}>
                  <p className={style.characteristicText}>Screen</p>
                  <p className={style.characteristicText}>Capacity</p>
                  <p className={style.characteristicText}>RAM</p>
                </div>
                <div className={style.characteristicItem}>
                  <p className={style.characteristicItemText}>
                    {product.screen}
                  </p>
                  <p className={style.characteristicItemText}>
                    {product.capacity}
                  </p>
                  <p className={style.characteristicItemText}>{product.ram}</p>
                </div>
              </div>
              <div className={style.buttons}>
                <button
                  type="button"
                  onClick={() => toggleCart(String(product.id))}
                  className={`${style.addButton} ${
                    cartIds.has(String(product.id)) ? style.addButtonClick : ''
                  }`}
                >
                  {cartIds.has(String(product.id)) ? 'Added' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className={`${style.likeButton} ${
                    likedIds.has(String(product.id))
                      ? style.likeButtonClick
                      : ''
                  }`}
                  onClick={() => toggleLike(String(product.id))}
                >
                  {likedIds.has(String(product.id)) ? (
                    <img
                      className={style.imgLike}
                      src="/img/liked.png"
                      alt="Liked"
                    />
                  ) : (
                    <img
                      className={style.imgLike}
                      src="/img/heart-like.svg"
                      alt="Like"
                    />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {pageSize.value !== 'all' && totalPages > 1 && (
          <ul className={style.pagination}>
            <li>
              <button
                type="button"
                className={style.arrowButton}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
            </li>

            {pageNumbers.map(page => (
              <li key={page}>
                <button
                  type="button"
                  className={`${style.pageButton} ${
                    page === currentPage ? style.pageButtonActive : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                type="button"
                className={style.arrowButton}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
};
