import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SmartSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirects user to /search page with their query in the URL
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ margin: '20px auto', maxWidth: '600px', padding: '15px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', color: '#333' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Express morning train to Central"
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }}
        />
        <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Search Trains
        </button>
      </form>
    </div>
  );
}