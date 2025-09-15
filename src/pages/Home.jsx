import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function Home(){
  const nav = useNavigate();
  return <div>
    <div style={{background:'url(https://images.unsplash.com/photo-1501117716987-c8e5082b2a8a?auto=format&fit=crop&w=1400&q=60) center/cover', padding:40, borderRadius:8, color:'white'}} className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1 style={{color: 'black', fontSize:36, margin:0}}>Find your perfect stay</h1>
          <p style={{color: 'black', opacity:0.9}}>Best hotels, best prices — all in one place.</p>
        </div>
      </div>
      <div style={{marginTop:20}} className="form-row">
        <input id="city" placeholder="City (e.g. Tokyo)"/>
        {/* <select id="guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option></select> */}
        <button onClick={()=> {
          const city = document.getElementById('city').value;
          nav('/search?city='+encodeURIComponent(city));
        }}>Search</button>
      </div>
    </div>
  </div>
}
