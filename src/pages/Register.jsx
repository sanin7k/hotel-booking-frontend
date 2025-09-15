import React, {useState} from 'react';
import api, {setToken} from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/auth/register',{name,email,password});
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      nav('/dashboard');
    }catch(e){ alert(e.response?.data?.message || e.message); }
  }
  return <div>
    <h2>Register</h2>
    <form onSubmit={submit} className="card">
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
  </div>
}
