import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './scss/main.scss';
import Header from "./components/header/Header";
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import Contact from './components/Contact';
import Footer from "./components/Footer";
// import  from './components/';

function App() {
return (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/about' element={<About />}/>
      <Route exact path='/contact' element={<Contact />}/>
      <Route exact path='/privacy_policy' element={<PrivacyPolicy />}/>
      <Route path='/*' element={<NotFoundPage />}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
);
}

export default App;