import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style/App.css';
import BasePage from './pages/base.page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BasePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
