import { useRouter } from 'next/router';

const SortDropdown = () => {
  const router = useRouter();
  const { sortBy } = router.query;

  const handleSortChange = (e) => {
    router.push(`/?sortBy=${e.target.value}`);
  };

  return (
    <div className="sort-dropdown">
      <select value={sortBy || ''} onChange={handleSortChange} className="dropdown">
        <option value="">Sort By</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
      <style jsx>{`
        .sort-dropdown {
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

export default SortDropdown;
