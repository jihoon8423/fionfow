import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home/Home';
import Statics from './components/statics/Statics';
import Footer from './components/Footer';
import Player from './components/page/PlayerPage.jsx';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statics" element={<Statics />} />
        <Route path="/players/:id/:name" element={<Player />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
