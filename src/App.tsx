import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import client from './apollo/client';
import { ApolloProvider } from '@apollo/client';
import Users from './components/Users';
import User from './components/User';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App" style={{backgroundColor: '#f2f2f2'}}>
      <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="/user/:id" element={<User/>} />
      </Routes>
    </div>
    </ApolloProvider>
    
  );
}

export default App;
