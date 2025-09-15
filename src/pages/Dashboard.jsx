import React, {useEffect, useState} from 'react';
import api, {setToken} from '../api';

export default function Dashboard(){
  const [user,setUser] = useState(null);
  const [bookings,setBookings] = useState([]);
  useEffect(()=> {
    const t = localStorage.getItem('token');
    if(t) setToken(t);
    async function load(){
      try{
        const resUser = await api.get('/auth/me');
        setUser(resUser.data);
        const res = await api.get('/bookings/mine');
        setBookings(res.data);
      }catch(e){
        console.error(e);
      }
    }
    load();
  }, []);
  if(!user) return <div>Loading...</div>;
  return <div>
    <h2>Welcome, {user.name}</h2>

    <div className="card">
      <h3>My Details</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
    </div>

    <div className="card">
      <h3>My Bookings</h3>
      {bookings.length===0 ? <p>No bookings yet.</p> : bookings.map(b=> <div key={b._id} className="card">
        <p><strong>{b.hotel?.name || b.hotelName}</strong></p>
        <p>{b.room?.name || b.roomName}</p>
        <p>{new Date(b.startDate || b.checkIn).toLocaleDateString()} → {new Date(b.endDate || b.checkOut).toLocaleDateString()}</p>
        <p>Status: {b.status}</p>
      </div>)}
    </div>
  </div>
}
