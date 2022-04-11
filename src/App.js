import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import { routes, firebaseConfig } from './config';
import { Routes, Route } from 'react-router-dom';
import './AppStyles/App.css';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';
// import 'firebase/compat/analytics';
import SignIn from './pages/login/SignIn';
import Register from './pages/login/Register';
import ChatRoom from './pages/chatroom/Chatroom';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuthContextProvider } from './context/UserAuthContext';

// firebase.initializeApp(firebaseConfig);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<SignIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route
            path='/chatroom'
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/*' element={<PageNotFound />}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
