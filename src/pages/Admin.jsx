import React, {useEffect, useState} from 'react';
import api, {setToken} from '../api';
export default function Admin(){
  const [hotels,setHotels]=useState([]);
  useEffect(()=> {
    const t = localStorage.getItem('token');
    if(t) setToken(t);
    api.get('/hotels').then(r=>setHotels(r.data)).catch(()=>{});
  }, []);
  return <div>
    <h2>Admin</h2>
    <p className="note">This simple admin area lists hotels and allows creating one via API (use tools like Postman or extend UI)</p>
    <div className="grid">
      {hotels.map(h=> <div key={h._id} className="card"><h4>{h.name}</h4><p>{h.city}</p></div>)}
    </div>
  </div>
}
