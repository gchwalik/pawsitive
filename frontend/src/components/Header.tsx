import { CompassIcon, GearSixIcon } from '@phosphor-icons/react';
import {Link} from "react-router";

import { Dropdown } from './Dropdown';

function Header() {
    // <div className="text-center mb-8">
    //     <h1 className="text-3xl font-bold text-gray-800 mb-2">Pawsitive Places</h1>
    //     <p className="text-gray-600">Because every dog deserves a peaceful walk</p>
    // </div>
  return (
    <nav className="navbar">
      <Link to="/" className="flex">
        <CompassIcon className="text-3xl font-semibold mr-0.5" weight="light" />
        <h1 className="text-3xl font-medium text-gray-800 leading-none">
          Pawsitive
        </h1>
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link text-md">Places</Link>
        <Link to="#" className="nav-link text-md flex items-center">
          <GearSixIcon className="w-5 h-5 mr-1.5"/>
          <p>Place Types</p>
        </Link> 
      </div>
      <div className="ml-auto">
        <Dropdown label="Admin" icon={CompassIcon}/>
      </div>

    </nav>
  )
    {/* 
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
*/}
}

export default Header;
