import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

const Home = () => {
  return (
    <div className="App">
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column text-center">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">pickney</h3>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link active" to="/">shop</Link>
              <Link className="nav-link" to="/cart">cart</Link>
              <Link className="nav-link" to="/login">login</Link>
            </nav>
          </div>
        </header>
        <main className="inner cover p-3" role="main">
          <h1 className="cover-heading">shop for youth clothing.</h1>
          <p className="lead">would you like to browse our wares? have a look around</p>
          {/*TODO: Add Image Carousel */}
          <hr/>
          {/*TODO: Add Table of Clothing Items & Search */}
        </main>
        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>Created by <a href="http://www.calebhoff.com">Caleb Hoff</a> &amp; <a href="https://github.com/RaminNour77">Ramin Nourbakhsh</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;