import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Hotel from './pages/Hotel'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import { setToken } from './api'
import './styles.css'

// import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';

// function Nav() {
//   const { user, logout } = useContext(AuthContext);
//   const nav = useNavigate();

//   return (
//     <nav className="nav">
//       <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
//         <Link to="/" className="logo">StayEase</Link>
//         <Link to="/search">Hotels</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </div>
//       <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
//         {user ? (
//           <>
//             <span style={{ marginRight: 8 }}>Hi, {user.name}</span>
//             <button onClick={() => nav('/dashboard')}>Dashboard</button>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login"><button>Login</button></Link>
//             <Link to="/register"><button>Register</button></Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

function Nav(){ 
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  useEffect(()=>{
    const raw = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(token) setToken(token);
    if(raw) setUser(JSON.parse(raw));
  }, []);

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    nav('/');
  }

  return <nav className="nav">
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      <Link to="/" className="logo">StayEase</Link>
      <Link to="/search">Hotels</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
    <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
      {user ? <><span style={{marginRight:8}}>Hi, {user.name}</span><button onClick={()=>nav('/dashboard')}>Dashboard</button><button onClick={logout}>Logout</button></>
            : <><Link to="/login"><button>Login</button></Link><Link to="/register"><button>Register</button></Link></>}
    </div>
  </nav>
}

function App(){
  return <BrowserRouter>
    {/* <AuthProvider> */}
    <Nav/>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/hotel/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
    {/* </AuthProvider> */}
  </BrowserRouter>
}

createRoot(document.getElementById('root')).render(<App/>)
