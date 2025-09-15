import React, {useState} from 'react';
import api, {setToken} from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/auth/login',{email,password});
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      nav('/dashboard');
    }catch(e){ alert(e.response?.data?.message || e.message); }
  }
  return <div>
    <h2>Login</h2>
    <form onSubmit={submit} className="card">
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
  </div>
}

// import { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigate();
//   const { login } = useContext(AuthContext);

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       login(res.data.user, res.data.token); // update context
//       nav('/dashboard');
//     } catch (e) {
//       alert(e.response?.data?.message || e.message);
//     }
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={submit} className="card">
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//         <button>Login</button>
//       </form>
//     </div>
//   );
// }
