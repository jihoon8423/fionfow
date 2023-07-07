import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home/Home';
import Statics from './components/statics/Statics';
import Footer from './components/Footer';
import Player from './components/page/playerpage/PlayerPage.jsx';
import Trade from './components/trade/Tradepage.jsx';
import AuthPage from './components/page/login-register/AuthPage';
import ProfilePage from './components/page/login-register/ProfilePage';
import AuthContext from './components/store/AuthContext';
import CreateAccountPage from './components/auth/CreateAccountForm';
import UpdateArticlePage from './components/page/UpdateArticlePage';
import CreateArticlePage from './components/page/CreateAticlePage';
import ArticleListPage from './components/page/ArticleListPage';
import ArticleOnePage from './components/page/ArticleOnePage';



function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statics" element={<Statics />} />
            <Route path="/players/:id/:name" element={<Player />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/login/*" element={authCtx.isLoggedIn ? (<Navigate to="/" />) : (<AuthPage />)}/>
            <Route path="/profile/" element={!authCtx.isLoggedIn ? (<Navigate to="/" />) : (<ProfilePage />)}/>
            <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />} />
            <Route path="/page/:pageId" element={<ArticleListPage />} />
            <Route path="/create" element={authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to='/' />} />
            <Route path="/update/:articleId" element={authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to='/' />} />
            <Route path="/article/:articleId" element={<ArticleOnePage />} />
          </Routes>
        <Footer />
    </div>
  );
}

export default App;
