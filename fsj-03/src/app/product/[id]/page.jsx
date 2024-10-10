import Head from 'next/head';
import Image from 'next/image';
import { fetchProductById } from '../../api/api';

/**
 * Detailed product page component.
 * @param {Object} props - Component props.
 * @param {Object} props.product - Product details.
 * @param {string} props.product.title - Product title.
 * @param {string} props.product.description - Product description.
 * @param {number} props.product.price - Product price.
 * @param {string} props.product.category - Product category.
 * @param {Array} props.product.images - Product images.
 * @param {Array} props.product.tags - Product tags.
 * @param {number} props.product.rating - Product rating.
 * @param {number} props.product.stock - Product stock status.
 * @param {Array} props.product.reviews - Product reviews.
 * @param {string} props.error - Error message, if any.
 * @returns {JSX.Element} The detailed product page.
 */
const DetailedProducts = ({ product, error }) => {
  if (error) return <div className="error">{error}</div>;

  const sortedReviews = product.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Head>
      <div className="product-detail-container">
        <div className="product-image">
          <Image 
            src={product.images[0]} 
            alt={product.title} 
            width={400} 
            height={400} 
            layout="responsive" 
            objectFit="cover" 
            quality={75} 
          />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          {product.tags && (
            <p className="tags">Tags: {product.tags.join(', ')}</p>
          )}
          <p className="rating">Rating: {product.rating} / 5</p>
          <p className="stock">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="reviews">
            <h2>Reviews</h2>
            {sortedReviews.length > 0 ? (
              <div className="review-container">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="review">
                    <p>
                      <strong>{review.name}</strong> Date: {new Date(review.date).toLocaleDateString('en-US')}
                    </p>
                    <p>Rated: {review.rating}/5</p>
                    <p>Comment: {review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .product-detail-container {
          font-family: Roboto, sans-serif;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
          background-color: #F5F5F5;
          border-radius: 8px;
        }

        .product-image {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .product-info {
          flex: 2;
          padding: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .price {
          font-size: 1.8rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 10px;
        }

        .category {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin-bottom: 15px;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #555;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .tag {
          background-color: #F5F5F5;
          border: 1px solid #f5d700;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .rating-star {
          color: #f5d700;
          font-size: 1.2rem;
        }

        .stock {
          font-size: 1.2rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 15px;
        }

        .reviews {
          margin-top: 20px;
        }

        .review {
          border-top: 1px solid #e1e1e1;
          padding: 10px;
          margin-top: 10px;
          width: 100%;
          background-color: #FFC107;
          border-radius: 8px;
          color: #fff;
        }

        .review p {
          font-weight: bold;
        }

        .error {
          color: #e74c3c;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .product-detail-container {
            flex-direction: column;
            align-items: center;
          }

          .product-image {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

/**
 * Fetches product details for server-side rendering.
 * @param {Object} context - Next.js context object.
 * @param {Object} context.params - Route parameters.
 * @param {string} context.params.id - Product ID.
 * @returns {Object} Props for the component.
 */
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);
    return { props: { product } };
  } catch (error) {
    return { props: { error: "Product failed to load, try again" } };
  }
}

export default DetailedProducts;
