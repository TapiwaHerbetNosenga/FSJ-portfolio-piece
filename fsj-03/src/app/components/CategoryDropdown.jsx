import { useRouter } from 'next/router';

const CategoryDropdown = () => {
  const router = useRouter();
  const { category } = router.query;

  const handleCategoryChange = (e) => {
    router.push(`/?category=${e.target.value}`);
  };

  return (
    <div className="category-dropdown">
      <select value={category || ''} onChange={handleCategoryChange} className="dropdown">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
        <option value="beauty">Beauty</option>
      </select>
      <style jsx>{`
        .category-dropdown {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 10px;
          font-size: 1rem;
          border: 2px solid #f5d700;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .dropdown:hover {
          border-color: #e5c600;
        }
      `}</style>
    </div>
  );
};

export default CategoryDropdown;
