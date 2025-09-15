import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useSearchParams } from 'react-router-dom';

export default function Search() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]); // store original data
  const [qparams] = useSearchParams();
  const city = qparams.get('city') || '';
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', rating: '' });

  useEffect(() => { fetchHotels(); }, []);

  async function fetchHotels() {
    const res = await api.get('/hotels', { params: { city } });
    setHotels(res.data);
    setAllHotels(res.data); // store original
  }

  function applyFilters() {
    const filtered = allHotels.filter(h => {
      if (filters.minPrice && h.priceRange.min < Number(filters.minPrice)) return false;
      if (filters.maxPrice && h.priceRange.min > Number(filters.maxPrice)) return false;
      if (filters.rating && h.rating < Number(filters.rating)) return false;
      return true;
    });
    setHotels(filtered);
  }

  return (
    <div>
      <h2>Search Results {city ? 'in ' + city : ''}</h2>
      <div className="card">
        <div className="form-row">
          <input
            placeholder="min price"
            value={filters.minPrice}
            onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
          />
          <input
            placeholder="max price"
            value={filters.maxPrice}
            onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
          />
          <select
            value={filters.rating}
            onChange={e => setFilters({ ...filters, rating: e.target.value })}
          >
            <option value="">Any rating</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
          <button onClick={applyFilters}>Apply</button>
          <button onClick={fetchHotels}>Reset</button>
        </div>
      </div>
      <div className="grid">
        {hotels.map(h => (
          <div key={h._id} className="card">
            <h3>{h.name} — {h.city}</h3>
            <p>{h.description}</p>
            <p><strong>From ${h.priceRange.min}</strong> • Rating: {h.rating}</p>
            <Link to={'/hotel/' + h._id}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
