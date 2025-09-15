import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function Hotel(){
  const {id} = useParams();
  const [hotel, setHotel] = useState(null);
  const [roomId, setRoomId] = useState('');
  useEffect(()=> { api.get('/hotels/'+id).then(r=>setHotel(r.data)); }, [id]);

  const [start, setStart] = useState(new Date().toISOString());
  const [end, setEnd] = useState(new Date(Date.now()+24*3600*1000).toISOString());

  async function book(){
    const token = localStorage.getItem('token');
    if(!token){ alert('Please login'); return; }
    if(!roomId) { alert('Room not selected'); return;}
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate < Date.now()) {
      alert('Invalid start date');
      return;
    }
    if (endDate < Date.now() || endDate < startDate) {
      alert('Invalid end date');
      return;
    }
    const res = await api.post('/bookings', {roomId, startDate:start, endDate:end, guests:1, totalAmount:100});
    alert('Booked! id='+res.data._id);
  }

  if(!hotel) return <div>Loading...</div>;
  return <div>
    <h2>{hotel.name}</h2>
    <p>{hotel.description}</p>
    <h3>Rooms</h3>
    <div className="grid">
      {hotel.rooms.map(r=> <div key={r._id} className="card">
        <h4>{r.name} — {r.type}</h4>
        <p>Price: ${r.price} • Capacity: {r.capacity}</p>
        <button onClick={()=> setRoomId(r._id)}>
          {roomId === r._id ? "Selected" : "Select"}
        </button>
      </div>)}
    </div>
    <div style={{marginTop:12}}>
      <label>Select starting date: </label>
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <label>Select ending date: </label>
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={book}>Book selected room</button>
    </div>
  </div>
}
