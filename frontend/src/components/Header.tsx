import { CompassIcon } from '@phosphor-icons/react';
import {Link} from "react-router";

import { Dropdown, DropdownLink } from './Dropdown';

function Header() {
  return (
    <nav className="navbar">
      <Link to="/" className="flex">
        <CompassIcon className="text-4xl font-semibold mr-0.5" weight="light" />
        <h1 className="text-3xl">
          Pawsitive
        </h1>
      </Link>

      <div className="ml-auto">
        <Dropdown label="More">
          <DropdownLink to="#">
            <p className="font-normal">Place Types</p>
          </DropdownLink>
        </Dropdown>
      </div>
    </nav>
  )   
}


export default Header;
