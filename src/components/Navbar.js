import React, { useEffect } from 'react'
import {
  Link, useLocation, useNavigate
} from "react-router-dom";


const Navbar = () => {
  let navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location= useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  
  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark"> */}
      <nav className="navbar navbar-expand-lg  "style={{backgroundColor: "#208454"}}>
  <div className="container-fluid">
    <Link className="navbar-brand text-light" to="/">NoteSpace</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link text-light ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className={`nav-link text-light ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li> */}
        
        
      </ul>
      {localStorage.getItem('token')?<button onClick={handleLogout} className="btn btn-outline-light">Logout</button>: 
      <form className="d-flex" role="search">
        <Link className="btn btn-outline-light mx-1" to="/login" role= "button ">Login</Link>
        <Link className="btn btn-outline-light mx-1" to="/signup" role= "button ">SignUp</Link>
      </form>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar