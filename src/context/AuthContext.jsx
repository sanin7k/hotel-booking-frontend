// import { createContext, useState, useEffect } from 'react';
// import { setToken } from '../api';

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const raw = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (token) setToken(token);
//     if (raw) setUser(JSON.parse(raw));
//   }, []);

//   function login(userData, token) {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//     setToken(token);
//     setUser(userData);
//   }

//   function logout() {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
