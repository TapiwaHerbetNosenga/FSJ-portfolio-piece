import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?search=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
      <style jsx>{`
        .search-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 10px;
          font-size: 1rem;
          border: 2px solid #f5d700;
          border-radius: 4px 0 0 4px;
          outline: none;
          width: 300px;
        }

        .search-button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #f5d700;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .search-button:hover {
          background-color: #e5c600;
        }
      `}</style>
    </form>
  );
};

export default SearchBar;
